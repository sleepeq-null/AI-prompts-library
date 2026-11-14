// ------------------------------------------------------------------
// PROMPT LIBRARY
// Add, edit, or remove prompts here. Each prompt needs:
//   sector:   "education" or "healthcare"
//   category: a short label used for the filter chips
//   title:    the card heading
//   use:      one line on when to use it
//   prompt:   the text people copy. Use [BRACKETS] for parts to fill in.
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
  }
];
