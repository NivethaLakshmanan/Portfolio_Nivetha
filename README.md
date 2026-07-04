# Nivetha L — Portfolio

A single-page, recruiter-friendly portfolio built with plain HTML/CSS/JS (no build tools needed).

## File structure
```
portfolio/
├── index.html          # all page content & structure
├── css/styles.css       # design system + responsive styles
├── js/script.js         # theme toggle, nav, animations, form
└── assets/
    └── Nivetha_L_Resume.pdf   # powers the "Download résumé" buttons
```

## Run it locally
No build step required — just open `index.html` in a browser, or serve it:
```bash
cd portfolio
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy

**GitHub Pages**
1. Push this folder's contents to a repo (e.g. `NivethaLakshmanan.github.io` for a root-level site).
2. Settings → Pages → set source to the `main` branch, root folder.
3. Site goes live at `https://nivethalakshmanan.github.io/`.

**Netlify**
1. Drag-and-drop the `portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or
2. `netlify deploy --prod` from inside the folder (Netlify CLI).

**Vercel**
```bash
npm i -g vercel
cd portfolio
vercel --prod
```
No framework preset needed — choose "Other" / static site.

## Before you publish
- Swap the placeholder GitHub/demo links on each project card for real repo or live-demo URLs once available.
- Replace `assets/og-cover.png` (referenced in the `<meta property="og:image">` tag) with an actual 1200×630 preview image, or remove that tag.
- Update the canonical URL in `<head>` if you host on a different domain.

## Enhancement ideas
- Wire the contact form to a real backend (Formspree, Netlify Forms, or a small serverless function) instead of the current `mailto:` fallback.
- Add real screenshots/GIFs of the Power BI dashboards to the project cards.
- Add a lightweight blog/notes section if you start writing about your data projects — it's good signal for recruiters.
- Add Google Analytics or Plausible if you want visit data.
