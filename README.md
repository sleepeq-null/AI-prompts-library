# AI Prompt Library for Work, School & Everyday Life

**Live site: [sleepeq-null.github.io/AI-prompts-library](https://sleepeq-null.github.io/AI-prompts-library/)**

A searchable library of 40 ready-to-use AI prompts for **educators, healthcare teams, accountants, Microsoft 365 Copilot users, students and families**, with an interactive builder that turns a prompt template into a finished prompt you can copy and paste into any AI assistant.

![Home page with looping Brooklyn Bridge video header, tabs for Education, Healthcare, Accounting, Microsoft 365 and Everyday life, topic filters and prompt cards](assets/screenshot-home.jpg)

## What's inside

| Area | Example prompts |
|---|---|
| **Education** | Lesson plans, differentiated activities, rubrics, quizzes, writing feedback, family emails |
| **Healthcare** | Plain-language patient handouts, SOAP and SBAR formatting, teaching cases, research summaries |
| **Accounting** | Budget vs. actual commentary, month-end close checklists, reconciliation troubleshooting, Excel formulas, technical memos |
| **Microsoft 365 Copilot** | Outlook thread summaries, Teams meeting recaps, Word drafts from files, Excel insights, PowerPoint decks from documents |
| **Everyday life** | Homework tutor that gives hints instead of answers, study plans, help for parents, meal plans, budgets, decoding confusing letters, resume bullets |

## Features

- **Interactive prompt builder.** Each prompt's `[PLACEHOLDERS]` become form fields automatically. As you type, a live preview highlights what you've filled in and what's still blank, and **Copy prompt** copies the finished text.
- **Filter and search.** Switch between five areas, narrow by topic, or search across titles and prompt text.
- **Privacy built in.** A visible notice and paste-field hints remind users never to include student, patient or client identifiers. Healthcare and accounting prompts ask for de-identified data (no account numbers) and tell the AI not to invent findings or figures.
- **Accessible and responsive.** Labelled form fields, keyboard-friendly controls, automatic dark mode, a layout that works at phone width, and a background video that holds still for visitors who have "reduce motion" turned on.
- **No build step.** Plain HTML, CSS and JavaScript, so it's fast, easy to host, and easy for non-developers to edit.

![Prompt builder: a "Condition / procedure" field filled with "type 2 diabetes" and the preview updating live](assets/screenshot-builder.jpg)

## How it works

| File | Role |
|---|---|
| `prompts.js` | The content: an array of prompt objects (`sector`, `category`, `title`, `use`, `prompt`). Non-developers only need to edit this file. |
| `app.js` | Rendering, filtering, search, the prompt builder and copy-to-clipboard |
| `styles.css` | Design tokens as CSS custom properties, with light and dark themes |
| `index.html` | Page structure and the card `<template>` |

**The builder** finds every `[BRACKETED]` placeholder in a prompt with a regular expression and turns each unique one into a form field:

- The bracket text becomes the label. Anything after `, e.g.` becomes placeholder text: `[LENGTH, e.g. 45-minute]` gives a **Length** field with the hint *e.g. 45-minute*.
- Placeholders starting with `PASTE` get a multi-line text area.
- A placeholder used more than once, like `[GRADE LEVEL]`, is one field that fills every occurrence.
- Typed values are kept per prompt, so they survive switching filters or searching.

Adding a new prompt with new placeholders needs no code changes: the form generates itself. Markers the AI itself should write, like `(ASSUMPTION)`, use parentheses so they don't become form fields.

## Design decisions

- **Static site over a framework.** The content is small and changes rarely, so plain HTML, CSS and JavaScript keeps the site fast, dependency-free and free to host on GitHub Pages.
- **Prompts in a `.js` file, not `.json`.** A `<script>` tag loads it, so the page also works opened straight from disk, where browsers block `fetch()` of local files.
- **Safe rendering.** Prompt text and user input are HTML-escaped before being highlighted in the preview, so pasted content can't inject markup.
- **Cache-busting.** GitHub Pages lets browsers cache files for about 10 minutes, which once caused new HTML to load with an old stylesheet. Asset links carry a version query (`styles.css?v=5`) that changes with each release.
- **Homework prompts that teach, not cheat.** The homework prompts tell the AI to ask guiding questions, give hints, and point to where a mistake is rather than handing over answers. Students get help learning, which is also what teachers and parents want.
- **Lightweight media.** The 12-second header video is the 720p version (3.6 MB), muted, looping and inline, under a gradient that keeps the text readable.

## Prompt-writing approach

Each prompt follows the same structure, which makes AI output more reliable:

1. **Role.** "You are an experienced 7th-grade science teacher…"
2. **Task and context.** What to make, for whom, and what the learners or patients already know.
3. **Format.** Sections, word limits, reading level.
4. **Guardrails.** "Only use information in the notes", "Do not rewrite the essay for them", "If a reason for a variance isn't clear, list it as a question instead of guessing".

Microsoft 365 Copilot prompts are written for the app they run in. They refer to "this email thread" or "this table" and use Copilot's `/` file picker, because Copilot already has the content open.

## Adding a prompt

Add an object to `prompts.js`:

```js
{
  sector: "education",          // or "healthcare", "accounting", "m365", "life"`n  category: "Assessment",       // new categories become filter chips automatically
  title: "Short card title",
  use: "One line on when to use it.",
  prompt: `The full prompt text.
Use [BRACKETS] for anything the reader fills in, e.g. [TOPIC, e.g. fractions].`
},
```

Then change `?v=5` to the next number in `index.html` so returning visitors get the update.

## Run locally

Open `index.html` in a browser, or serve the folder with any static server.

## Credits

Header video: [Time Lapse View of Brooklyn Bridge at Night](https://www.pexels.com/video/time-lapse-view-of-brooklyn-bridge-at-night-5606315/) by Sarowar Hussain, used under the [Pexels License](https://www.pexels.com/license/).
