# Bogdan OS

Moj portfolio, napravljen da liči na stari operativni sistem: ikonice na desktopu, prozori koji se pomeraju, taskbar i mali terminal.

Uživo: https://bogdan-sarcevic.netlify.app

## Kako radi

- Bez frameworka: `index.html`, `script.js` i Tailwind za stilove.
- Prozori se prevlače preko Pointer Events, pa radi i mišem i prstom. Na telefonu se otvaraju preko celog ekrana.
- Zvukovi se generišu preko Web Audio API-ja, bez audio fajlova. Podrazumevano su isključeni.
- Srpski i engleski, izbor se pamti u `localStorage`.
- Terminal prima: `help`, `about`, `skills`, `projects`, `services`, `contact`, `lang`, `clear`.

## Pokretanje

```
npm install
npm run watch   # dok radiš
npm run build   # pravi output.css
```

Pa otvori `index.html`. `output.css` nije u repou, Netlify ga pravi pri deployu (vidi `netlify.toml`).
