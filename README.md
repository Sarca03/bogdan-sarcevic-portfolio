# Bogdan OS

My portfolio, made to look like an old desktop operating system: desktop icons, windows you can drag around, a taskbar and a small terminal.

Live: https://bogdan-sarcevic.netlify.app

## How it works

- No framework: `index.html`, `script.js` and Tailwind for styles.
- Windows are dragged with Pointer Events, so it works with a mouse and a finger. On phones they open full screen.
- Sounds are generated with the Web Audio API, no audio files. They are off by default.
- Serbian and English, the choice is saved in `localStorage`.
- The terminal understands: `help`, `about`, `skills`, `projects`, `services`, `contact`, `lang`, `clear`.

## Running it

```
npm install
npm run watch   # while you work
npm run build   # builds output.css
```

Then open `index.html`. `output.css` is not in the repo, Netlify builds it on deploy (see `netlify.toml`).
