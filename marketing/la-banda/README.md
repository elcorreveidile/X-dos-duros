# La Banda: así funciona la mesa — reel y carrusel

Explica el experimento público de `por2duros.com/mesa` (diez agentes de IA,
cartera simulada de 100 USD) para las redes de Por 2 Duros. Mismo formato
que los reels de WordNext (`wp-next-starter/marketing/reel-*`): animación
HTML/CSS determinista, captura frame a frame con Chromium y encode H.264 en
WASM. **No necesita red ni ffmpeg completo.**

## Entregables (en esta carpeta)

- `reel.mp4` — 1080×1920, H.264 High yuv420p (libx264), 30 fps, 47 s, índice al
  principio (*faststart*) y pista de audio en silencio: se reproduce en cualquier sitio.
- `portada.png` — frame de tapa (el gancho, 1,6 s).
- `reel.srt` — rótulos temporizados (accesibilidad).
- `carrusel/la-banda-01..08.png` — carrusel 4:5 (2160×2700), mismo guion.
- `caption.txt` — dos textos para el post + hashtags + notas.
- `suno-prompt.txt` — prompt para generar la música (los mp3 no se versionan).

## Reproducir

```sh
cd build
npm install
node capture.mjs             # ~15 min; escribe ../reel.mp4 (ya remezclado), ../portada.png, ../reel.srt
node capture.mjs --preview   # un frame por escena en ../preview/ para revisar
npm run build                # PNG del carrusel → ../carrusel/
node mux-audio.mjs ../reel.mp4 pista.mp3 ../reel-con-musica.mp4 47   # opcional
```

Chromium: `/opt/pw-browsers/chromium` o `PLAYWRIGHT_CHROMIUM=/ruta`.

## Guion del reel (6 escenas)

| t (s) | Escena |
|---|---|
| 0–4,2 | Gancho: «Diez agentes de IA. Cien dólares. En público.» · «Así funciona el sistema.» |
| 4,2–11,8 | El problema: «Una IA sola se lo cree todo.» Un bloque «IA» con busca · decide · ejecuta, sello rojo «Nadie le dice que no», y «Por eso usamos diez. Y ninguna manda.» |
| 11,8–24,4 | La cadena: los diez agentes en fila; un fichero neón baja de Tokio a Profesor iluminando cada uno (1,05 s por traspaso). «No comparten memoria: solo se pasan un fichero…» |
| 24,4–32,4 | El veto: brief de Nairobi a Palermo con checklist (liquidez ✓, invalidación ✓, brief ✓, objetivo/riesgo 1,2 ✗) y sello «VETO». «La mayoría de las horas no se opera.» |
| 32,4–40,4 | El registro: nueve líneas de log (traspasos, veto, informe) apareciendo una a una. «Cada traspaso, cada veto y cada informe: firmados, con motivo y públicos.» |
| 40,4–47 | Cierre: «Lo publicamos todo, gane o pierda.» · 100 USD · BTC/ETH · 1 hora · cada hora → `por2duros.com/mesa` + aviso de dinero ficticio. |

Los roles y las reglas (veto por ratio < 1,5, devolución de Lisboa, 0,3 %
de deslizamiento, 0,1 % de comisión) son los reales del motor
(`la-banda/domains/trading/config.ts`); las horas y cifras del registro son
de ejemplo.

## Reglas de contenido

- Marca Por 2 Duros: negro `#0A0A0A`, neón `#39FF14`, Inter + JetBrains Mono
  embebidas desde `@fontsource` (sin red).
- Sin promesas de rentabilidad ni «señales»: la cartera es ficticia y el
  aviso de «no es asesoramiento financiero» va en el reel, el carrusel y el
  texto del post.
- No se muestra ninguna sesión real: los datos del registro son inventados.

## Piezas

- `build/reel.html` — 6 escenas; expone `window.renderAt(tMs)` y
  `window.DURATION_MS` (todo función pura de `tMs`, sin CSS animations).
- `build/capture.mjs` — captura y encode; `--preview` para revisar escenas.
- `build/remux.mjs` — el mp4 del codificador WASM (minih264) es un H.264 Baseline
  poco habitual, con el índice (`moov`) al final y sin audio, y algunos
  reproductores no lo abren; este paso lo recodifica con libx264 (`--recode`,
  perfil High, ~1,5 min), mueve el índice al principio y añade una pista AAC
  en silencio. Sin `--recode` solo remezcla.
- `build/slides.html` + `build/render.mjs` — carrusel.
- `build/mux-audio.mjs` — incrusta una pista con ffmpeg.wasm.
