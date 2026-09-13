// Incrusta un audio en el reel con ffmpeg.wasm dentro del Chromium de
// Playwright. El ffmpeg del sistema no maneja audio; ffmpeg.wasm trae el core
// como wasm y funciona sin red. Todo se sirve por HTTP local (127.0.0.1) para
// que el bundle UMD de webpack resuelva su publicPath y los workers/blobs.
//
// Uso: node mux-audio.mjs <video.mp4> <audio.mp3> <salida.mp4> [durSegundos]
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const nm = (p) => join(__dir, "node_modules", p);
const [videoPath, audioPath, outPath, durArg] = process.argv.slice(2);
const DUR = Number(durArg || 27);
if (!videoPath || !audioPath || !outPath) { console.error("args: <video> <audio> <salida> [dur]"); process.exit(1); }
const fadeOutStart = Math.max(0, DUR - 1.5);

const files = {
  "/core.js":     [readFileSync(nm("@ffmpeg/core/dist/umd/ffmpeg-core.js")), "text/javascript"],
  "/core.wasm":   [readFileSync(nm("@ffmpeg/core/dist/umd/ffmpeg-core.wasm")), "application/wasm"],
  "/in.mp4":      [readFileSync(videoPath), "video/mp4"],
  "/in.mp3":      [readFileSync(audioPath), "audio/mpeg"],
};
const page = `<!doctype html><html><head><meta charset=utf-8></head><body>
<script src="/core.js"></script></body></html>`;

const server = createServer((req, res) => {
  if (req.url === "/" ) { res.writeHead(200, {"content-type":"text/html"}); return res.end(page); }
  const f = files[req.url];
  if (!f) { console.log("  [404]", req.url); res.writeHead(404); return res.end(); }
  console.log("  [200]", req.url);
  res.writeHead(200, {"content-type": f[1], "content-length": f[0].length});
  res.end(f[0]);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
const pg = await browser.newPage();
pg.on("console", (m) => console.log("  [page]", m.text()));
pg.on("pageerror", (e) => console.log("  [pageerror]", e.message));
await pg.goto(base + "/", { waitUntil: "load" });

const outB64 = await pg.evaluate(async ({ dur, fadeOutStart, base }) => {
  const meta = btoa(JSON.stringify({ wasmURL: base + "/core.wasm" }));
  const core = await window.createFFmpegCore({ mainScriptUrlOrBlob: base + "/core.js#" + meta });
  core.setLogger((e) => { try { console.log(e && (e.message ?? JSON.stringify(e))); } catch {} });
  const get = async (u) => new Uint8Array(await (await fetch(u)).arrayBuffer());
  core.FS.writeFile("in.mp4", await get("/in.mp4"));
  core.FS.writeFile("in.mp3", await get("/in.mp3"));
  const ret = core.exec(
    "-i", "in.mp4", "-i", "in.mp3",
    "-map", "0:v:0", "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
    "-t", String(dur),
    "-af", `afade=t=in:st=0:d=0.2,afade=t=out:st=${fadeOutStart}:d=1.5`,
    "-movflags", "+faststart",
    "out.mp4",
  );
  console.log("exec ret:", ret);
  if (ret !== 0) throw new Error("ffmpeg exec ret " + ret);
  const data = core.FS.readFile("out.mp4");
  let bin = ""; const CH = 0x8000;
  for (let i = 0; i < data.length; i += CH) bin += String.fromCharCode.apply(null, data.subarray(i, i + CH));
  return btoa(bin);
}, { dur: DUR, fadeOutStart, base });

writeFileSync(outPath, Buffer.from(outB64, "base64"));
console.log("Escrito:", outPath, (Buffer.from(outB64, "base64").length / 1e6).toFixed(2) + "MB");
await browser.close();
server.close();
