// Productor del reel «La Banda: así funciona la mesa» (Por 2 Duros).
// Renderiza reel.html frame a frame con Chromium (determinista) y codifica
// H.264/mp4 con h264-mp4-encoder (WASM). Sin red, sin ffmpeg completo.
//
// Uso:  node capture.mjs [--preview]   (--preview: solo un frame por escena, a ../preview/)
// Salidas (en la carpeta padre):  reel.mp4, portada.png, reel.srt
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const HME = require("h264-mp4-encoder");
const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..");
const CHROMIUM = process.env.PLAYWRIGHT_CHROMIUM || "/opt/pw-browsers/chromium";
const PREVIEW = process.argv.includes("--preview");
const W = 1080, H = 1920, FPS = 30;

// Fuentes incrustadas (Inter + JetBrains Mono, sin red).
function fontFaceCss() {
  const f = (p) => "data:font/woff2;base64," + readFileSync(require.resolve(p)).toString("base64");
  return [
    ...[400, 500, 600, 700, 800, 900].map((w) => `@font-face{font-family:"Inter";font-weight:${w};font-display:block;src:url(${f(`@fontsource/inter/files/inter-latin-${w}-normal.woff2`)}) format("woff2")}`),
    ...[400, 700].map((w) => `@font-face{font-family:"JetBrains Mono";font-weight:${w};font-display:block;src:url(${f(`@fontsource/jetbrains-mono/files/jetbrains-mono-latin-${w}-normal.woff2`)}) format("woff2")}`),
  ].join("");
}

// Rótulos (accesibilidad). Coinciden con el guion de reel.html.
const CUES = [
  [0.0, 3.4,   "Diez agentes de IA. Cien dólares. En público. Así funciona el sistema."],
  [3.4, 9.2,   "Una IA sola se lo cree todo: busca, decide y ejecuta sin nadie que le diga que no. Por eso usamos diez, y ninguna manda."],
  [9.2, 19.0,  "Un trabajo cada uno: Tokio busca, Denver contrasta, Estocolmo dimensiona, Río fija niveles, Berlín redacta, Lisboa comprueba, Nairobi resume, Palermo veta, Helsinki registra, el Profesor informa."],
  [19.0, 25.2, "Palermo puede decir no: si el objetivo no vale 1,5 veces el riesgo, veto. La mayoría de las horas no se opera."],
  [25.2, 30.8, "Todo queda escrito: cada traspaso, cada veto y cada informe, firmados y con motivo."],
  [30.8, 36.0, "100 USD ficticios, BTC y ETH, velas de una hora. Lo publicamos todo, gane o pierda → por2duros.com/mesa"],
];
const srtTime = (s) => { const ms = Math.round(s * 1000); const p = (n, l) => String(n).padStart(l, "0");
  return `${p(Math.floor(ms / 3600000), 2)}:${p(Math.floor(ms / 60000) % 60, 2)}:${p(Math.floor(ms / 1000) % 60, 2)},${p(ms % 1000, 3)}`; };
const writeSrt = () => writeFileSync(join(OUT, "reel.srt"), CUES.map(([a, b, txt], i) => `${i + 1}\n${srtTime(a)} --> ${srtTime(b)}\n${txt}\n`).join("\n"), "utf8");

async function main() {
  const browser = await chromium.launch({ executablePath: CHROMIUM, args: ["--no-sandbox", "--force-color-profile=srgb", "--disable-lcd-text"] });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
  await page.goto("file://" + join(__dir, "reel.html"), { waitUntil: "load" });
  await page.addStyleTag({ content: fontFaceCss() });
  await page.evaluate(async () => { await document.fonts.load('900 96px "Inter"'); await document.fonts.load('700 30px "JetBrains Mono"'); await document.fonts.ready; });
  const clip = { x: 0, y: 0, width: W, height: H };

  if (PREVIEW) {
    const dir = join(OUT, "preview"); mkdirSync(dir, { recursive: true });
    for (const ms of [1600, 8400, 16500, 24300, 29500, 34000]) {
      await page.evaluate((m) => window.renderAt(m), ms);
      writeFileSync(join(dir, `_${String(ms).padStart(5, "0")}.png`), await page.screenshot({ clip, type: "png", animations: "disabled" }));
    }
    await browser.close(); console.log("preview →", dir); return;
  }

  writeSrt();
  const DURATION_MS = await page.evaluate(() => window.DURATION_MS);
  const total = Math.round((DURATION_MS / 1000) * FPS);
  const PORTADA_FRAME = Math.round(1.6 * FPS);
  const enc = await HME.createH264MP4Encoder();
  enc.width = W; enc.height = H; enc.frameRate = FPS; enc.quantizationParameter = 24; enc.speed = 6; enc.groupOfPictures = 30;
  enc.initialize();
  process.stdout.write(`Renderizando ${total} frames a ${W}x${H} @${FPS}fps…\n`);
  for (let i = 0; i < total; i++) {
    await page.evaluate((ms) => window.renderAt(ms), (i / FPS) * 1000);
    const buf = await page.screenshot({ clip, type: "png", animations: "disabled" });
    const png = PNG.sync.read(buf);
    enc.addFrameRgba(new Uint8Array(png.data.buffer, png.data.byteOffset, png.data.length));
    if (i === PORTADA_FRAME) writeFileSync(join(OUT, "portada.png"), buf);
    if (i % 60 === 0 || i === total - 1) process.stdout.write(`  ${i + 1}/${total}\r`);
  }
  enc.finalize();
  const mp4 = enc.FS.readFile(enc.outputFilename);
  writeFileSync(join(OUT, "reel.mp4"), Buffer.from(mp4));
  enc.delete();
  await browser.close();
  process.stdout.write(`\nListo: reel.mp4 (${(mp4.length / 1e6).toFixed(2)} MB), portada.png, reel.srt\n`);
}
main().catch((e) => { console.error(e); process.exit(1); });
