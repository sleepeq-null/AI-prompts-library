# AI Prompt Library for Educators & Healthcare Professionals

A simple, static website of ready-to-use AI prompts. Visitors can filter by audience (Education / Healthcare), filter by topic, search, and copy any prompt with one click.

No build tools or frameworks: it's plain HTML, CSS and JavaScript, so GitHub Pages can host it as-is.

## Files

| File | What it is |
|---|---|
| `index.html` | The page layout, intro text, privacy notice and tips |
| `prompts.js` | **The prompt library.** Edit this to add or change prompts |
| `app.js` | Filtering, search and copy-to-clipboard |
| `styles.css` | Styling (includes automatic dark mode) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Publish on GitHub Pages

### Option A: in the browser (no command line)

1. Sign in to GitHub and click **New repository** (top-right **+** menu).
2. Name it, e.g. `ai-prompt-library`, set it to **Public**, and click **Create repository**.
3. On the new repo page, click **uploading an existing file**, drag in all the files from this folder (including `.nojekyll`), and click **Commit changes**.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose branch **main** and folder **/ (root)**, then **Save**.
6. After a minute or two your site will be live at
   `https://<your-username>.github.io/ai-prompt-library/`

> Tip: if you name the repository exactly `<your-username>.github.io`, the site will be at `https://<your-username>.github.io/` instead.

### Option B: with Git

```bash
git init
git add .
git commit -m "Initial prompt library"
git branch -M main
git remote add origin https://github.com/<your-username>/ai-prompt-library.git
git push -u origin main
```

Then do steps 4–6 above.

## Adding a prompt

Open `prompts.js` and add an entry to the list:

```js
{
  sector: "education",          // or "healthcare"
  category: "Assessment",       // new categories appear as filter chips automatically
  title: "Short card title",
  use: "One line on when to use it.",
  prompt: `The full prompt text.
Use [BRACKETS] for anything the reader should fill in.`
},
```

Commit the change (or edit the file directly on GitHub with the pencil icon) and the site updates within a minute or two.

## Preview locally

Just double-click `index.html` to open it in your browser.
