# AI's Real Impact on Jobs — project website

Next.js 16 (App Router) + Tailwind CSS v4, exported as static HTML.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Where to edit

| What | File |
|---|---|
| Tableau embeds (URLs, titles, What / Insight / Why text) | `content/vizzes.ts` |
| Hero stats, findings, takeaways, datasets, team, references | `content/site.ts` |
| Colours (incl. exposure-tier colours, keep in sync with Tableau) | `app/globals.css` |
| Section layout | `components/sections/index.tsx` |

### Adding a Tableau viz
1. Publish the workbook to Tableau Public.
2. Copy the view URL: `https://public.tableau.com/views/<Workbook>/<View>`.
3. Paste it as `src` on the matching entry in `content/vizzes.ts` (or on a `variants` item).
   Entries without `src` show a placeholder.

Vizzes lazy-load when scrolled into view via the Tableau Embedding API v3 (`<tableau-viz>`).

## Deploy
Import the repo on Vercel and set **Root Directory** to `web`. Every push to `main` deploys.
