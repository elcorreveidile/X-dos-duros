// Remezcla el mp4 del codificador para que se reproduzca en cualquier sitio:
// mueve el índice al principio (faststart) sin recodificar el vídeo y añade una
// pista de audio en silencio (AAC) para que ningún reproductor ni Instagram lo
// rechace por no tener audio. ffmpeg.wasm dentro del Chromium de Playwright.
// Uso: node remux.mjs <entrada.mp4> <salida.mp4> [--recode]
//   --recode: recodifica el vídeo con libx264 (perfil High, yuv420p, CRF 20) en vez de copiarlo.
//   El codificador WASM (minih264) escribe un H.264 Baseline poco habitual y algún reproductor lo rechaza.
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const nm = (p) => join(__dir, "node_modules", p);
const args = process.argv.slice(2); const RECODE = args.includes("--recode");
const [inPath, outPath] = args.filter((a) => !a.startsWith("--"));
if (!inPath || !outPath) { console.error("uso: node remux.mjs <entrada.mp4> <salida.mp4>"); process.exit(1); }

const files = {
  "/core.js": [readFileSync(nm("@ffmpeg/core/dist/umd/ffmpeg-core.js")), "text/javascript"],
  "/core.wasm": [readFileSync(nm("@ffmpeg/core/dist/umd/ffmpeg-core.wasm")), "application/wasm"],
  "/in.mp4": [readFileSync(inPath), "video/mp4"],
};
const server = createServer((req, res) => {
  if (req.url === "/") { res.writeHead(200, { "content-type": "text/html" }); return res.end('<!doctype html><meta charset=utf-8><script src="/core.js"></script>'); }
  const f = files[req.url]; if (!f) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": f[1], "content-length": f[0].length }); res.end(f[0]);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
const pg = await browser.newPage();
pg.on("pageerror", (e) => console.log("  [pageerror]", e.message));
pg.on("console", (m) => console.log("  " + m.text()));
await pg.goto(base + "/", { waitUntil: "load" });
const outB64 = await pg.evaluate(async ({ base, recode }) => {
  const meta = btoa(JSON.stringify({ wasmURL: base + "/core.wasm" }));
  const core = await window.createFFmpegCore({ mainScriptUrlOrBlob: base + "/core.js#" + meta });
  const logs = []; core.setLogger((e) => logs.push(e && (e.message ?? "")));
  core.FS.writeFile("in.mp4", new Uint8Array(await (await fetch("/in.mp4")).arrayBuffer()));
  const video = recode ? ["-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p", "-g", "30", "-r", "30"] : ["-c:v", "copy"];
  const ret = core.exec("-i", "in.mp4", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-map", "0:v:0", "-map", "1:a:0", ...video, "-c:a", "aac", "-b:a", "64k", "-shortest", "-movflags", "+faststart", "-brand", "mp42", "out.mp4");
  console.log(logs.filter((l) => /Stream #|Video:|Audio:/.test(l)).join("\n"));
  if (ret !== 0) throw new Error("ffmpeg ret " + ret + "\n" + logs.slice(-30).join("\n"));
  const data = core.FS.readFile("out.mp4");
  let bin = ""; for (let i = 0; i < data.length; i += 0x8000) bin += String.fromCharCode.apply(null, data.subarray(i, i + 0x8000));
  return btoa(bin);
}, { base, recode: RECODE });
const out = Buffer.from(outB64, "base64");
writeFileSync(outPath, out);
server.close(); await browser.close();
console.log(`Listo: ${outPath} (${(out.length / 1e6).toFixed(2)} MB, faststart${RECODE ? ", libx264" : ""})`);
