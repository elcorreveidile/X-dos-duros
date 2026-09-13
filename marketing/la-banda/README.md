# La Banda — carrusel y reel para redes

Explica cómo funciona La Banda (la mesa pública de `por2duros.com/mesa`) en
ocho diapositivas 1080×1350 y un reel 1080×1920 (41 s).

- `carrusel/la-banda-01..08.png` — las diapositivas listas para subir (2160×2700).
- `reel/la-banda-reel-portada.png` — portada del reel; el `.mp4` no se versiona
  (se genera en local, ~9 MB).
- `caption.txt` — texto del post (sirve para el carrusel y el reel).
- `build/` — fuentes: `slides.html` (copy y estilo), `reel.html` (reproductor),
  `render.mjs` y `reel.mjs`. Marca Por 2 Duros: negro, neón `#39FF14`, Inter +
  JetBrains Mono embebidas (sin red).

```sh
cd marketing/la-banda/build
npm install
npm run build                       # PNG del carrusel → ../carrusel/
node reel.mjs la-banda              # reel mudo → ../reel/la-banda-reel.mp4
node reel.mjs la-banda musica.mp3   # reel con música incrustada (ffmpeg.wasm)
```

Sin pista de audio el reel sale mudo: lo normal es ponerle la música desde la
propia app de Instagram al publicarlo. Los tiempos de cada diapositiva están en
`window.SETS` de `reel.html`. Chromium: `/opt/pw-browsers/chromium` o
`PLAYWRIGHT_CHROMIUM=/ruta`.
