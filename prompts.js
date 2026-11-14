// ------------------------------------------------------------------
// PROMPT LIBRARY
// Add, edit, or remove prompts here. Each prompt needs:
//   sector:   "education", "healthcare", "accounting" or "m365"
//   category: a short label used for the filter chips
//   title:    the card heading
//   use:      one line on when to use it
//   prompt:   the text people copy. Use [BRACKETS] for parts to fill in;
//             each one becomes a form field. Use (PARENTHESES) for markers
//             you want the AI itself to write, so they don't become fields.
// ------------------------------------------------------------------
window.PROMPTS = [
  // ---------------- EDUCATION ----------------
  {
    sector: "education",
    category: "Lesson planning",
    title: "Build a lesson plan",
    use: "Draft a full lesson in minutes, then adapt it to your class.",
    prompt: `You are an experienced [GRADE LEVEL] [SUBJECT] teacher.

Create a [LENGTH, e.g. 45-minute] lesson plan on [TOPIC] for [NUMBER] students.

Include:
1. A clear learning objective (what students will be able to do)
2. A 5-minute warm-up that activates prior knowledge
3. Direct instruction with one worked example
4. A collaborative activity
5. A 3-question exit ticket with answers

Students have already learned [PRIOR KNOWLEDGE]. Keep the language age-appropriate and note where I could check for understanding.`
  },
  {
    sector: "education",
    category: "Differentiation",
    title: "Differentiate one activity three ways",
    use: "Support struggling learners and stretch advanced ones with the same content.",
    prompt: `Here is an activity I use with my [GRADE LEVEL] class:

[PASTE ACTIVITY]

Rewrite it in three versions:
- Supported: for students who need scaffolding (sentence starters, chunked steps, a word bank)
- On level: the original goal, tightened for clarity
- Extension: a more open-ended challenge for students who finish early

All three must target the same learning objective: [OBJECTIVE].`
  },
  {
    sector: "education",
    category: "Assessment",
    title: "Create a rubric",
    use: "Turn an assignment brief into a clear, student-friendly rubric.",
    prompt: `Create a 4-level analytic rubric (Exceeds, Meets, Approaching, Beginning) for this assignment:

[PASTE ASSIGNMENT DESCRIPTION]

Use 4–5 criteria. For each cell, describe what the work actually looks like, not just "good" or "poor". Then write a version of the rubric in plain language that a [GRADE LEVEL] student could use to self-assess.`
  },
  {
    sector: "education",
    category: "Assessment",
    title: "Write a quiz with explanations",
    use: "Generate practice questions that teach, not just test.",
    prompt: `Write [NUMBER] multiple-choice questions on [TOPIC] for [GRADE LEVEL] students.

For each question:
- 4 options with one correct answer
- Distractors based on common misconceptions
- A one-sentence explanation of why the correct answer is right and why the most tempting wrong answer is wrong

Mix recall and application questions. Put the answer key at the end.`
  },
  {
    sector: "education",
    category: "Feedback",
    title: "Give feedback on student writing",
    use: "Get a first pass of specific, encouraging feedback you can personalize.",
    prompt: `Act as a supportive writing teacher. Review the student essay below against these criteria: [CRITERIA, e.g. thesis, evidence, organization].

Give:
1. Two specific strengths, quoting the student's own words
2. The single most important thing to improve next, with an example of how
3. One question that pushes their thinking further

Keep the tone warm and the feedback under 150 words. Do not rewrite the essay for them.

Essay:
[PASTE ESSAY, with the student's name removed]`
  },
  {
    sector: "education",
    category: "Communication",
    title: "Email to families",
    use: "Write clear, friendly updates to parents and guardians.",
    prompt: `Write a short email to the families of my [GRADE LEVEL] class about [TOPIC, e.g. an upcoming field trip / a new reading program].

Key details: [DATES, COSTS, WHAT THEY NEED TO DO]

Keep it under 200 words, warm and jargon-free, with the action items in a short bulleted list. Then provide a version translated into [LANGUAGE].`
  },
  {
    sector: "education",
    category: "Lesson planning",
    title: "Explain a concept at different levels",
    use: "Find the right way in for a tricky idea.",
    prompt: `Explain [CONCEPT] three ways:
1. To a 10-year-old, using an everyday analogy
2. To a high school student, with one concrete example
3. To a college student, with correct technical vocabulary

Then list the two most common misconceptions students have about this concept and a quick way to address each one in class.`
  },
  {
    sector: "education",
    category: "Communication",
    title: "Prepare for a difficult conversation",
    use: "Rehearse a parent or student meeting before it happens.",
    prompt: `I have a meeting with [A PARENT / A STUDENT] about [SITUATION, e.g. repeated missing work], with no identifying details.

Help me prepare:
1. An opening that is calm and collaborative
2. Three key points I need to communicate, phrased constructively
3. Two likely reactions and how I could respond to each
4. A clear next step we can agree on

Then role-play as the [PARENT / STUDENT] so I can practice. Wait for my first line.`
  },

  // ---------------- HEALTHCARE ----------------
  {
    sector: "healthcare",
    category: "Patient education",
    title: "Plain-language patient handout",
    use: "Turn clinical information into something patients can actually read.",
    prompt: `Write a one-page patient handout about [CONDITION / PROCEDURE] at a 6th-grade reading level.

Sections:
- What it is (2–3 sentences)
- What to expect
- What you can do at home
- When to call us vs. when to go to the emergency room (bulleted, specific)
- Questions to ask your care team

Avoid jargon; if a medical term is necessary, define it in parentheses. Use a warm, reassuring tone. I will review it for clinical accuracy before use.`
  },
  {
    sector: "healthcare",
    category: "Patient education",
    title: "Explain a diagnosis simply",
    use: "Practice explaining a complex diagnosis with empathy.",
    prompt: `Help me explain [DIAGNOSIS] to a patient who has [CONTEXT, e.g. limited health literacy / high anxiety / English as a second language].

Give me:
1. A 3–4 sentence explanation using an everyday analogy
2. The "teach-back" question I should ask to check understanding
3. Words or phrases to avoid because they commonly cause fear or confusion`
  },
  {
    sector: "healthcare",
    category: "Documentation",
    title: "Structure de-identified notes",
    use: "Organize rough notes into a clean, consistent format.",
    prompt: `Reformat the de-identified notes below into a SOAP note (Subjective, Objective, Assessment, Plan).

Rules:
- Only use information that appears in the notes. Do not add findings, diagnoses, or values.
- If something a SOAP note usually includes is missing, list it under "Missing / to confirm" at the end.
- Keep it concise and use standard abbreviations.

Notes:
[PASTE DE-IDENTIFIED NOTES]`
  },
  {
    sector: "healthcare",
    category: "Education & training",
    title: "Build a clinical case study",
    use: "Create realistic teaching cases for students or staff training.",
    prompt: `Create a fictional teaching case for [AUDIENCE, e.g. second-year nursing students] on [TOPIC, e.g. recognizing sepsis].

Include:
- A patient presentation with history, vitals, and initial findings
- 2–3 "decision points" where the learner must choose what to do next, with what happens after each choice
- Discussion questions
- Key learning points with references to the relevant guideline areas I should verify

Make the case realistic but clearly fictional.`
  },
  {
    sector: "healthcare",
    category: "Education & training",
    title: "Quiz for staff training",
    use: "Check understanding after an in-service or policy update.",
    prompt: `Here is a summary of our updated [POLICY / PROTOCOL]:

[PASTE SUMMARY]

Write 8 scenario-based questions that test whether staff can apply it, not just remember it. Mix multiple choice and short answer. Include an answer key with a one-line rationale for each, citing the relevant part of the summary.`
  },
  {
    sector: "healthcare",
    category: "Communication",
    title: "Clear shift handoff",
    use: "Structure a handoff using SBAR so nothing gets missed.",
    prompt: `Turn the de-identified information below into an SBAR handoff (Situation, Background, Assessment, Recommendation) I can give verbally in under 60 seconds.

Flag anything that sounds time-sensitive at the top. Do not add information that isn't in my notes.

Information:
[PASTE DE-IDENTIFIED DETAILS]`
  },
  {
    sector: "healthcare",
    category: "Research",
    title: "Summarize a research article",
    use: "Get the key points of a paper before a journal club or practice change.",
    prompt: `Summarize the article below for a busy clinician.

Format:
- Question the study asked
- Design and population (with sample size)
- Main findings, including effect sizes
- Limitations and possible bias
- What this does and does not mean for practice

Be careful to separate what the authors found from your interpretation. If something is unclear in the text, say so instead of guessing.

Article:
[PASTE ABSTRACT OR FULL TEXT]`
  },
  {
    sector: "healthcare",
    category: "Communication",
    title: "Write a compassionate message",
    use: "Draft patient portal replies that are clear and kind.",
    prompt: `Draft a patient portal reply to the message below. The patient is asking about [TOPIC].

Clinical guidance I want to convey: [YOUR GUIDANCE]

Keep it under 120 words, warm and clear, avoid jargon, and end with exactly what the patient should do next and when to contact us urgently. I will review and edit before sending.

Patient message (de-identified):
[PASTE MESSAGE]`
  },

  // ---------------- ACCOUNTING ----------------
  {
    sector: "accounting",
    category: "Analysis",
    title: "Budget vs. actual commentary",
    use: "Turn a variance table into clear commentary for management.",
    prompt: `You are a senior FP&A analyst. Below is a budget vs. actual summary for [PERIOD, e.g. Q3 2026] for [DEPARTMENT OR ENTITY].

[PASTE VARIANCE TABLE, with amounts but no account numbers]

Write management commentary that:
1. Opens with a 2-sentence overall summary
2. Explains the 3–5 largest variances (over [THRESHOLD, e.g. 5% or $10,000]), separating timing differences from permanent ones
3. Flags anything that needs follow-up
4. Uses plain business language, not accounting jargon

Only use the figures given. If a reason for a variance isn't clear from the data, list it as a question for me to confirm instead of guessing.`
  },
  {
    sector: "accounting",
    category: "Close & reconciliation",
    title: "Month-end close checklist",
    use: "Build or tighten a close checklist for your team.",
    prompt: `Create a month-end close checklist for a [COMPANY TYPE, e.g. 50-person services firm] using [ACCOUNTING SYSTEM, e.g. QuickBooks Online].

Organize it by close day (Day 1 to Day [NUMBER OF CLOSE DAYS]) and include for each task:
- The task
- Suggested owner role
- What "done" looks like (e.g. reconciliation signed off, variance under threshold)

Cover cash, AR, AP, accruals, prepaid expenses, fixed assets, payroll, and the final review. Point out the tasks that most often cause delays and how to start them earlier.`
  },
  {
    sector: "accounting",
    category: "Close & reconciliation",
    title: "Troubleshoot a reconciliation",
    use: "Work through why two balances don't match.",
    prompt: `I'm reconciling [ACCOUNT TYPE, e.g. the operating bank account] and the balances don't match.

Book balance: [BOOK BALANCE]
Statement / subledger balance: [OTHER BALANCE]
Difference: [DIFFERENCE]

Unmatched items so far (descriptions and amounts only, no account numbers):
[PASTE UNMATCHED ITEMS]

Walk me through the most likely causes in order of probability (timing, duplicates, transpositions, missing entries), the quick checks for each, and whether the difference has any telltale signs (e.g. divisible by 9 suggests a transposition). Then suggest which items to investigate first.`
  },
  {
    sector: "accounting",
    category: "Excel & tools",
    title: "Write an Excel formula",
    use: "Get the right formula and understand how it works.",
    prompt: `I'm working in Excel. My data has these columns: [DESCRIBE COLUMNS, e.g. A = date, B = vendor, C = amount, D = GL code].

I want to: [WHAT YOU WANT, e.g. total the amounts by vendor for the current month only]

Give me:
1. The formula (prefer modern functions like XLOOKUP, SUMIFS, FILTER if they fit)
2. A plain-English explanation of each part
3. One common mistake to avoid with this formula
4. An alternative approach using a PivotTable, if that would be simpler`
  },
  {
    sector: "accounting",
    category: "Client communication",
    title: "Request missing documents",
    use: "Chase clients for paperwork politely and clearly.",
    prompt: `Write a short, friendly email to a client asking for documents we still need for [ENGAGEMENT, e.g. their 2026 tax return].

Missing items:
[LIST OF MISSING ITEMS]

Deadline: [DEADLINE]

Keep it under 150 words, explain briefly why the deadline matters, list the items as a checklist, and tell them how to send files securely through [SECURE UPLOAD METHOD, e.g. our client portal]. Remind them not to email sensitive documents. Then write a firmer follow-up version for if they haven't replied in a week.`
  },
  {
    sector: "accounting",
    category: "Standards & research",
    title: "Explain an accounting standard",
    use: "Get up to speed on a standard before applying it.",
    prompt: `Explain [STANDARD, e.g. ASC 842 lease accounting] to someone with a general accounting background.

Cover:
1. What problem the standard solves
2. The key judgments and calculations involved
3. A simple worked example with numbers
4. Common mistakes in practice
5. Which disclosures it typically requires

Point out anything that changed recently or differs between [FRAMEWORKS, e.g. US GAAP and IFRS]. Note which points I should verify against the authoritative guidance, since your knowledge may be out of date.`
  },
  {
    sector: "accounting",
    category: "Standards & research",
    title: "Draft a technical accounting memo",
    use: "Document a judgment area in a clear, audit-ready way.",
    prompt: `Help me draft a technical accounting memo on this issue:

[DESCRIBE THE TRANSACTION OR ISSUE, without client names]

Use this structure:
- Background
- Issue(s)
- Relevant guidance (name the standards and sections I should cite; I'll confirm the exact references)
- Analysis of the alternatives considered
- Conclusion
- Financial statement and disclosure impact

Write in a neutral, professional tone. Mark any facts you are assuming with (ASSUMPTION) so I can confirm them.`
  },
  {
    sector: "accounting",
    category: "Client communication",
    title: "Explain financials to a non-accountant",
    use: "Help a business owner understand their numbers.",
    prompt: `Explain these financial results to a small business owner with no accounting background:

[PASTE SUMMARY P&L OR KEY FIGURES]

In under 250 words:
1. Say how the business did this period in one sentence
2. Explain the 3 numbers that matter most and why
3. Explain the difference between profit and cash if it's relevant here
4. Suggest 2 questions they should be asking

Use everyday analogies and no jargon.`
  },

  // ---------------- MICROSOFT 365 COPILOT ----------------
  {
    sector: "m365",
    category: "Outlook",
    title: "Summarize a long email thread",
    use: "Catch up on a long thread in seconds (Copilot in Outlook).",
    prompt: `Summarize this email thread for me.

Give me:
1. The main question or decision being discussed, in one sentence
2. Where things stand now and who said what last
3. Any open questions or requests directed at me
4. Deadlines mentioned

Keep it to bullet points. Then suggest a short reply that [YOUR GOAL, e.g. agrees to the Thursday deadline but asks for the final numbers first].`
  },
  {
    sector: "m365",
    category: "Outlook",
    title: "Draft a reply in the right tone",
    use: "Write a clear reply to a tricky email.",
    prompt: `Draft a reply to this email. I want to [YOUR GOAL, e.g. politely decline the meeting and suggest an async update instead].

Tone: [TONE, e.g. warm but firm]
Length: under [WORD LIMIT, e.g. 120] words

Acknowledge their main point first, be specific about next steps, and don't over-apologize.`
  },
  {
    sector: "m365",
    category: "Teams",
    title: "Meeting recap with action items",
    use: "Turn a recorded or transcribed meeting into a recap (Copilot in Teams).",
    prompt: `Recap this meeting.

Include:
1. A 3-sentence summary
2. Decisions made
3. Action items as a table: task, owner, due date (write "not stated" if no date was given)
4. Open questions that weren't resolved
5. Anything that was raised but not discussed fully

Only include what was actually said in the meeting. Then draft a short follow-up message I can post in the [CHANNEL OR CHAT NAME] chat.`
  },
  {
    sector: "m365",
    category: "Copilot Chat",
    title: "Catch up on what I missed",
    use: "Get back up to speed after time off.",
    prompt: `I was out from [DATES]. Based on my email, Teams chats and meetings from that time, what do I need to know?

Organize it as:
1. Things that need my action, with any deadlines
2. Decisions made that affect my work
3. Updates on [PROJECT OR TOPIC]
4. Messages I can probably skip

Link to the source email, chat or meeting for each item.`
  },
  {
    sector: "m365",
    category: "Word",
    title: "Draft a document from my files",
    use: "Start a first draft from existing notes or files (Copilot in Word).",
    prompt: `Draft a [DOCUMENT TYPE, e.g. one-page project proposal] using [SOURCE FILE, e.g. type / to choose your meeting notes file].

Audience: [AUDIENCE, e.g. department heads]
Goal: [GOAL, e.g. get approval for a pilot program]

Structure it with clear headings, keep it under [LENGTH, e.g. 600 words], and end with the specific decision or next step I'm asking for. Leave notes like (CONFIRM: budget figure) where information is missing from the source file.`
  },
  {
    sector: "m365",
    category: "Word",
    title: "Rewrite for a different audience",
    use: "Adapt a document without starting from scratch.",
    prompt: `Rewrite this document for [NEW AUDIENCE, e.g. parents / patients / the executive team].

Keep the key facts and any numbers exactly the same. Change:
- The reading level to [READING LEVEL, e.g. 8th grade]
- The length to about [LENGTH, e.g. half the current length]
- The tone to [TONE, e.g. reassuring and practical]

Then list anything you removed, so I can check nothing important was lost.`
  },
  {
    sector: "m365",
    category: "Excel",
    title: "Find insights in a table",
    use: "Explore data and add calculations (Copilot in Excel).",
    prompt: `Analyze this table and tell me the 3 most important trends or outliers, with the numbers behind each.

Then:
1. Add a column that calculates [CALCULATION, e.g. percent change from last month]
2. Suggest the best chart to show [WHAT TO SHOW, e.g. how each region is trending] and create it
3. Highlight rows where [CONDITION, e.g. the amount is over budget]

Explain any formulas you add so I can check them.`
  },
  {
    sector: "m365",
    category: "PowerPoint",
    title: "Create a deck from a document",
    use: "Turn a report or proposal into slides (Copilot in PowerPoint).",
    prompt: `Create a presentation from [SOURCE FILE, e.g. type / to choose your Word document].

- About [NUMBER OF SLIDES, e.g. 8] slides for [AUDIENCE]
- One clear message per slide, written as the slide title
- No more than 4 short bullets per slide
- Speaker notes with what to say for each slide
- A final slide with the decision or next step we need

Keep all figures exactly as they appear in the source.`
  }
];
