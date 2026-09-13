// Renderiza cada <section class="slide" data-out="carpeta/nombre"> de slides.html
// como PNG 2160×2700 (1080×1350 @2x) en la carpeta padre. Uso: node render.mjs [filtro]
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..");
const filter = process.argv[2] ?? "";
const b64 = (p) => "data:font/woff2;base64," + readFileSync(require.resolve(p)).toString("base64");
const css = [
  ...[400, 500, 700, 800, 900].map((w) => `@font-face{font-family:"Inter";font-weight:${w};font-display:block;src:url(${b64(`@fontsource/inter/files/inter-latin-${w}-normal.woff2`)}) format("woff2")}`),
  ...[400, 700].map((w) => `@font-face{font-family:"JetBrains Mono";font-weight:${w};font-display:block;src:url(${b64(`@fontsource/jetbrains-mono/files/jetbrains-mono-latin-${w}-normal.woff2`)}) format("woff2")}`),
].join("");
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || "/opt/pw-browsers/chromium", args: ["--no-sandbox", "--force-color-profile=srgb"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
await page.goto("file://" + join(__dir, "slides.html"), { waitUntil: "load" });
await page.addStyleTag({ content: css });
await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
const slides = await page.$$("section.slide");
let n = 0;
for (const s of slides) {
  const out = await s.getAttribute("data-out");
  if (!out || !out.includes(filter)) continue;
  mkdirSync(join(OUT, dirname(out)), { recursive: true });
  await s.screenshot({ path: join(OUT, out + ".png"), type: "png" });
  n++;
  console.log("→", out + ".png");
}
await browser.close();
console.log(`${n} slides`);
