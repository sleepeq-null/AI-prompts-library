# Contributing

Thanks for helping make the prompt library better! There are three ways to contribute. None of them need coding experience.

## 1. Suggest a prompt (easiest)

Open the **[Suggest a prompt](https://github.com/sleepeq-null/AI-prompts-library/issues/new?template=suggest-prompt.yml)** form, fill in the fields, and submit. If it's a good fit, it'll be added to the site.

## 2. Report a problem

Found a typo, a broken feature, or a prompt that gives poor results? Use **[Report a problem](https://github.com/sleepeq-null/AI-prompts-library/issues/new?template=report-problem.yml)**.

## 3. Add a prompt yourself (pull request)

1. Click the pencil icon on [`prompts.js`](prompts.js) to edit it in your browser. GitHub will make a copy (a "fork") for you.
2. Add your prompt to the list, following the existing ones:
   ```js
   {
     sector: "education",   // education, healthcare, accounting, m365 or life
     category: "Assessment",
     title: "Short card title",
     use: "One line on when to use it.",
     prompt: `The full prompt. Use [BRACKETS] for parts people fill in.`
   },
   ```
3. In `index.html`, change the three `?v=` numbers to the next number so visitors get the update.
4. Click **Propose changes**, then **Create pull request**.

An automated check (**Validate prompts**) runs on every pull request. It catches missing fields, unbalanced brackets, duplicate titles, and anything that looks like real personal data. If it fails, click **Details** to see what to fix.

To run the same check on your own computer (needs [Node.js](https://nodejs.org)):

```bash
node scripts/validate-prompts.mjs
```

## What makes a good prompt

- **Give the AI a role and context.** "You are an experienced 7th-grade science teacher…"
- **Be specific about the output.** Sections, word limits, reading level.
- **Add guardrails.** "Only use the information I've given", "Ask me instead of guessing".
- **Use `[BRACKETS]` for anything the reader fills in.** Add a hint with `, e.g.`, as in `[TOPIC, e.g. fractions]`. Start with `PASTE` for long text, as in `[PASTE NOTES]`.
- **Use `(PARENTHESES)` for markers the AI should write**, like `(ASSUMPTION)`, so they don't become form fields.

## Privacy rule

Never include real names, student or patient details, account numbers, or any other identifying information in a prompt or an example, including in issues and discussions.
