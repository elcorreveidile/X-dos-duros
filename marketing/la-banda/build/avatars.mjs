// Avatares de La Banda: diez máscaras geométricas, una por agente, con un rasgo
// de su oficio. Fuente única: trazos en currentColor (valen en negro + neón y en
// el panel claro) y acentos fijos (rojo de Palermo, ámbar de Lisboa).
//
// Uso: node avatars.mjs           → ../avatares/<agente>.svg (neón), avatares.json (markup
//                                   interior para los componentes React de la web y el panel),
//                                   PNG 1080×1080 por agente y hoja de grupo.
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "avatares");
mkdirSync(OUT, { recursive: true });

const S = 'fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"';
const ROJO = "#FF3B3B", AMBAR = "#FFC93B";

/** viewBox 0 0 120 120. Cada entrada: { role, inner } (markup SVG interior). */
export const AVATARS = {
  Tokio: { role: "busca el setup", inner: `
    <path ${S} d="M60 10 L102 33 V77 L60 110 L18 77 V33 Z"/>
    <path ${S} d="M32 56 H50"/>
    <circle ${S} cx="82" cy="56" r="11"/><circle cx="82" cy="56" r="3.5" fill="currentColor"/>
    <path ${S} d="M82 40 v5 M82 67 v5 M66 56 h5 M93 56 h5"/>` },
  Denver: { role: "contrasta el contexto", inner: `
    <rect ${S} x="18" y="14" width="84" height="92" rx="20"/>
    <path fill="currentColor" fill-rule="evenodd" d="M60 14 H82 A20 20 0 0 1 102 34 V86 A20 20 0 0 1 82 106 H60 Z M70 52 H90 V60 H70 Z"/>
    <path ${S} d="M30 56 H50"/>` },
  Estocolmo: { role: "dimensiona la posición", inner: `
    <path ${S} d="M22 16 H98 V70 C98 98 74 108 60 110 C46 108 22 98 22 70 Z"/>
    <path ${S} d="M34 52 H50 M70 52 H86"/>
    <path ${S} d="M34 94 v-8 M43 92 v-5 M52 94 v-8 M61 92 v-5 M70 94 v-8 M79 92 v-5 M88 91 v-5"/>` },
  Río: { role: "fija stop y objetivo", inner: `
    <ellipse ${S} cx="60" cy="60" rx="38" ry="46"/>
    <path ${S} d="M34 60 H50 M70 60 H86"/>
    <path ${S} d="M10 30 H110 M10 90 H110"/>
    <path ${S} d="M104 24 l6 6 -6 6 M16 84 l-6 6 6 6"/>` },
  Berlín: { role: "redacta las condiciones", inner: `
    <path ${S} d="M20 18 H100 V66 L60 110 L20 66 Z"/>
    <path ${S} d="M32 50 l16 6 M88 50 l-16 6"/>
    <path ${S} d="M38 72 H44 V90 H38 M82 72 H76 V90 H82"/>` },
  Lisboa: { role: "comprueba la frescura", inner: `
    <circle ${S} cx="60" cy="60" r="46"/>
    <circle ${S} cx="60" cy="38" r="12"/>
    <path fill="none" stroke="${AMBAR}" stroke-width="5" stroke-linecap="round" d="M60 38 V29 M60 38 H67"/>
    <path ${S} d="M34 70 H50 M70 70 H86"/>` },
  Nairobi: { role: "resume en una página", inner: `
    <path ${S} d="M28 12 H78 L94 28 V108 H28 Z"/>
    <path ${S} d="M78 12 V28 H94"/>
    <path ${S} d="M38 50 H52 M68 50 H82"/>
    <path ${S} d="M40 74 H80 M40 86 H80 M40 98 H64"/>` },
  Palermo: { role: "veta o aprueba", inner: `
    <path ${S} d="M34 14 H86 L106 34 V86 L86 106 H34 L14 86 V34 Z"/>
    <path ${S} d="M32 50 H50 M70 50 H88"/>
    <path fill="none" stroke="${ROJO}" stroke-width="7" stroke-linecap="round" d="M42 72 L78 96 M78 72 L42 96"/>` },
  Helsinki: { role: "registra la orden", inner: `
    <rect ${S} x="20" y="12" width="80" height="96" rx="6"/>
    <path ${S} d="M20 44 H100 M20 60 H100 M20 76 H100 M20 92 H100 M36 44 V108"/>
    <path ${S} d="M34 28 H48 M72 28 H86"/>` },
  Profesor: { role: "cierra e informa", inner: `
    <rect ${S} x="16" y="14" width="88" height="92" rx="30"/>
    <circle ${S} cx="42" cy="56" r="13"/><circle ${S} cx="78" cy="56" r="13"/>
    <path ${S} d="M55 56 H65 M29 54 H16 M91 54 H104"/>
    <path ${S} d="M50 88 H70"/>` },
};

export const svg = (name, { color = "#39FF14", size } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"${size ? ` width="${size}" height="${size}"` : ""} style="color:${color}" role="img" aria-label="${name}">${AVATARS[name].inner}\n</svg>\n`;

async function main() {
  const json = {};
  for (const name of Object.keys(AVATARS)) {
    const file = name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    writeFileSync(join(OUT, `${file}.svg`), svg(name));
    json[name] = { role: AVATARS[name].role, inner: AVATARS[name].inner.replace(/\n\s*/g, "") };
  }
  const jsonText = JSON.stringify(json, null, 2) + "\n";
  writeFileSync(join(OUT, "avatares.json"), jsonText);
  // Copia para el componente de la web (src/components/AgentAvatar.tsx).
  writeFileSync(join(__dir, "..", "..", "..", "src", "lib", "la-banda-avatares.json"), jsonText);

  // PNG por agente (1080×1080, para redes) y hoja de grupo (1080×1350).
  const f = (p) => "data:font/woff2;base64," + readFileSync(require.resolve(p)).toString("base64");
  const css = `@font-face{font-family:"Inter";font-weight:900;src:url(${f("@fontsource/inter/files/inter-latin-900-normal.woff2")}) format("woff2")}
    @font-face{font-family:"JetBrains Mono";font-weight:700;src:url(${f("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2")}) format("woff2")}
    *{margin:0;box-sizing:border-box} body{background:#0A0A0A;color:#fff;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
    .one{width:1080px;height:1080px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;position:relative}
    .one svg{width:560px;height:560px}
    .name{font-weight:900;font-size:88px;text-transform:uppercase;letter-spacing:-.02em;line-height:1}
    .role{font-family:"JetBrains Mono",monospace;font-weight:700;font-size:30px;letter-spacing:.16em;text-transform:uppercase;color:#8A8A8A}
    .logo{position:absolute;left:60px;top:60px;display:flex;align-items:center;gap:16px;font-weight:900;font-size:26px;letter-spacing:.14em;text-transform:uppercase}
    .logo .p{width:48px;height:48px;background:#39FF14;color:#0A0A0A;display:flex;align-items:center;justify-content:center;font-size:30px;letter-spacing:0}
    .url{position:absolute;right:60px;bottom:60px;font-family:"JetBrains Mono",monospace;font-weight:700;font-size:24px;letter-spacing:.12em;color:#39FF14}
    .sheet{width:1080px;height:1350px;padding:84px;display:flex;flex-direction:column}
    .sheet .h{font-weight:900;font-size:72px;text-transform:uppercase;line-height:.98;letter-spacing:-.02em;margin-top:70px}
    .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:22px 18px;margin-top:60px}
    .cell{display:flex;flex-direction:column;align-items:center;gap:14px}
    .cell svg{width:150px;height:150px}
    .cell b{font-weight:900;font-size:24px;text-transform:uppercase}
    .cell i{font-family:"JetBrains Mono",monospace;font-style:normal;font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:#8A8A8A;text-align:center;line-height:1.3}`;
  const logo = `<div class="logo"><span class="p">P</span>Por 2 Duros</div>`;
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || "/opt/pw-browsers/chromium", args: ["--no-sandbox", "--force-color-profile=srgb"] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
  for (const name of Object.keys(AVATARS)) {
    const file = name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    await page.setContent(`<style>${css}</style><div class="one">${logo}${svg(name)}<div class="name">${name}</div><div class="role">${AVATARS[name].role}</div><div class="url">por2duros.com/mesa</div></div>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(OUT, `${file}-1080.png`), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  }
  await page.setViewportSize({ width: 1080, height: 1350 });
  const cells = Object.entries(AVATARS).map(([n, a]) => `<div class="cell">${svg(n)}<b>${n}</b><i>${a.role}</i></div>`).join("");
  await page.setContent(`<style>${css}</style><div class="sheet">${logo}<div class="h">La Banda:<br><span style="color:#39FF14">diez agentes,</span><br>un trabajo cada uno.</div><div class="grid">${cells}</div><div class="url">por2duros.com/mesa</div></div>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(OUT, "la-banda-avatares.png"), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  await browser.close();
  console.log("avatares →", OUT);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) main().catch((e) => { console.error(e); process.exit(1); });
