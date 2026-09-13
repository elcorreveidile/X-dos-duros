// Reel de un carrusel: renderiza reel.html frame a frame (Chromium) y codifica
// H.264 con h264-mp4-encoder; después incrusta la música con ffmpeg.wasm
// (la pista se repite con cruce si es más corta que el vídeo).
//
// Uso:  node reel.mjs <set> [musica.mp3]   (sin pista → vídeo mudo; la música se pone en Instagram)
// Salidas: ../reel/<set>-reel.mp4, ../reel/<set>-reel-portada.png
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const HME = require("h264-mp4-encoder");
const __dir = dirname(fileURLToPath(import.meta.url));
const CHROMIUM = process.env.PLAYWRIGHT_CHROMIUM || "/opt/pw-browsers/chromium";
const [SET, AUDIO] = process.argv.slice(2);
if (!SET) { console.error("uso: node reel.mjs <set> [musica.mp3]"); process.exit(1); }
const OUT = join(__dir, "..", "reel");
mkdirSync(OUT, { recursive: true });
const W = 1080, H = 1920, FPS = 30;
const PORTADA_S = 1.0;

const browser = await chromium.launch({ executablePath: CHROMIUM, args: ["--no-sandbox", "--force-color-profile=srgb"] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
await page.goto("file://" + join(__dir, "reel.html") + "?set=" + SET, { waitUntil: "load" });
const mono = (w) => "data:font/woff2;base64," + readFileSync(require.resolve(`@fontsource/jetbrains-mono/files/jetbrains-mono-latin-${w}-normal.woff2`)).toString("base64");
await page.addStyleTag({ content: [400, 700].map((w) => `@font-face{font-family:"JetBrains Mono";font-weight:${w};src:url(${mono(w)}) format("woff2")}`).join("") });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(async () => { await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
const DURATION_MS = await page.evaluate(() => window.DURATION_MS);
const DUR = DURATION_MS / 1000;
const total = Math.round(DUR * FPS);

const enc = await HME.createH264MP4Encoder();
enc.width = W; enc.height = H; enc.frameRate = FPS; enc.quantizationParameter = 23; enc.speed = 6; enc.groupOfPictures = 30;
enc.initialize();
process.stdout.write(`Renderizando ${total} frames (${DUR}s) de «${SET}»…\n`);
for (let i = 0; i < total; i++) {
  await page.evaluate((ms) => window.renderAt(ms), (i / FPS) * 1000);
  const buf = await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, type: "png", animations: "disabled" });
  const png = PNG.sync.read(buf);
  enc.addFrameRgba(new Uint8Array(png.data.buffer, png.data.byteOffset, png.data.length));
  if (i === Math.round(PORTADA_S * FPS)) writeFileSync(join(OUT, `${SET}-reel-portada.png`), buf);
  if (i % 60 === 0 || i === total - 1) process.stdout.write(`  ${i + 1}/${total}\r`);
}
enc.finalize();
const mute = Buffer.from(enc.FS.readFile(enc.outputFilename));
enc.delete();
if (!AUDIO) {
  writeFileSync(join(OUT, `${SET}-reel.mp4`), mute);
  await browser.close();
  console.log(`\nListo (sin música): reel/${SET}-reel.mp4 (${(mute.length / 1e6).toFixed(2)} MB), reel/${SET}-reel-portada.png`);
  process.exit(0);
}
const mutePath = join(OUT, `_${SET}-mudo.mp4`);
writeFileSync(mutePath, mute);
process.stdout.write(`\nVídeo mudo listo (${(mute.length / 1e6).toFixed(2)} MB). Incrustando música…\n`);

// ---- música con ffmpeg.wasm (servido por HTTP local para que el UMD resuelva sus rutas)
const nm = (p) => join(__dir, "node_modules", p);
const files = {
  "/core.js": [readFileSync(nm("@ffmpeg/core/dist/umd/ffmpeg-core.js")), "text/javascript"],
  "/core.wasm": [readFileSync(nm("@ffmpeg/core/dist/umd/ffmpeg-core.wasm")), "application/wasm"],
  "/in.mp4": [mute, "video/mp4"],
  "/in.mp3": [readFileSync(AUDIO), "audio/mpeg"],
};
const server = createServer((req, res) => {
  if (req.url === "/") { res.writeHead(200, { "content-type": "text/html" }); return res.end('<!doctype html><meta charset=utf-8><script src="/core.js"></script>'); }
  const f = files[req.url]; if (!f) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": f[1], "content-length": f[0].length }); res.end(f[0]);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const pg = await browser.newPage();
pg.on("pageerror", (e) => console.log("  [pageerror]", e.message));
await pg.goto(base + "/", { waitUntil: "load" });
const outB64 = await pg.evaluate(async ({ dur, base }) => {
  const meta = btoa(JSON.stringify({ wasmURL: base + "/core.wasm" }));
  const core = await window.createFFmpegCore({ mainScriptUrlOrBlob: base + "/core.js#" + meta });
  const logs = []; core.setLogger((e) => logs.push(e && (e.message ?? "")));
  const get = async (u) => new Uint8Array(await (await fetch(u)).arrayBuffer());
  core.FS.writeFile("in.mp4", await get("/in.mp4"));
  core.FS.writeFile("in.mp3", await get("/in.mp3"));
  // La pista se encadena consigo misma con un cruce de 0,6 s hasta cubrir el vídeo; fundido de salida al final.
  const XF = 0.6, fadeStart = Math.max(0, dur - 1.2);
  const ret = core.exec(
    "-i", "in.mp4", "-i", "in.mp3", "-i", "in.mp3", "-i", "in.mp3",
    "-filter_complex", `[1:a][2:a]acrossfade=d=${XF}:c1=tri:c2=tri[a12];[a12][3:a]acrossfade=d=${XF}:c1=tri:c2=tri[a];[a]atrim=0:${dur},afade=t=in:st=0:d=0.15,afade=t=out:st=${fadeStart}:d=1.2[out]`,
    "-map", "0:v:0", "-map", "[out]",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
    "-t", String(dur), "-movflags", "+faststart", "out.mp4",
  );
  if (ret !== 0) throw new Error("ffmpeg ret " + ret + "\n" + logs.slice(-30).join("\n"));
  const data = core.FS.readFile("out.mp4");
  let bin = ""; for (let i = 0; i < data.length; i += 0x8000) bin += String.fromCharCode.apply(null, data.subarray(i, i + 0x8000));
  return btoa(bin);
}, { dur: DUR, base });
const final = Buffer.from(outB64, "base64");
writeFileSync(join(OUT, `${SET}-reel.mp4`), final);
unlinkSync(mutePath);
server.close();
await browser.close();
console.log(`Listo: reel/${SET}-reel.mp4 (${(final.length / 1e6).toFixed(2)} MB), reel/${SET}-reel-portada.png`);
