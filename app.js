(function () {
  const prompts = window.PROMPTS || [];
  const state = { sector: "all", category: null, query: "" };
  // What people have typed into each prompt's fields, keyed by prompt title,
  // so values survive re-rendering when filters or search change.
  const values = {};

  const grid = document.getElementById("grid");
  const chips = document.getElementById("chips");
  const count = document.getElementById("count");
  const tpl = document.getElementById("card-tpl");
  const label = {
    education: "Education",
    healthcare: "Healthcare",
    accounting: "Accounting",
    m365: "Microsoft 365",
    life: "Everyday life"
  };
  const PLACEHOLDER = /\[[^\]]+\]/g;
  // Longer prompts (e.g. with pasted essays) are copied instead of pre-filled,
  // to stay well under browser and server URL-length limits.
  const MAX_PREFILL = 6000;

  const escapeHtml = (s) =>
    s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Prompt builder helpers ----------

  // Unique [PLACEHOLDERS] in the order they first appear.
  const placeholdersOf = (text) => [...new Set(text.match(PLACEHOLDER) || [])];

  // "[LENGTH, e.g. 45-minute]" -> { label: "Length", hint: "e.g. 45-minute", long: false }
  // "[PASTE ESSAY, with the student's name removed]" -> multi-line field
  function describe(key) {
    let inner = key.slice(1, -1).trim();
    const long = /^PASTE\b/i.test(inner);
    if (long) inner = inner.replace(/^PASTE\s+/i, "");
    let hint = "";
    const eg = inner.search(/,\s*e\.g\./i);
    if (eg !== -1) {
      hint = inner.slice(eg + 1).trim();
      inner = inner.slice(0, eg);
    }
    const text = inner.toLowerCase();
    return { label: text.charAt(0).toUpperCase() + text.slice(1), hint, long };
  }

  // Replace each placeholder with its typed value; leave unfilled ones as-is.
  const fill = (text, vals) =>
    text.replace(PLACEHOLDER, (m) => (vals[m] && vals[m].trim() ? vals[m].trim() : m));

  // Same as fill(), but returns HTML that highlights filled and unfilled parts.
  function previewHtml(text, vals) {
    let html = "";
    let last = 0;
    text.replace(PLACEHOLDER, (m, offset) => {
      html += escapeHtml(text.slice(last, offset));
      const v = vals[m] && vals[m].trim();
      html += v
        ? `<mark class="filled">${escapeHtml(v)}</mark>`
        : `<mark>${escapeHtml(m)}</mark>`;
      last = offset + m.length;
      return m;
    });
    return html + escapeHtml(text.slice(last));
  }

  function buildCard(p, idx) {
    const node = tpl.content.cloneNode(true);
    const vals = (values[p.title] = values[p.title] || {});
    const keys = placeholdersOf(p.prompt);

    const badge = node.querySelector(".badge");
    badge.textContent = label[p.sector] || p.sector;
    badge.classList.add(p.sector);
    node.querySelector(".cat").textContent = p.category;
    node.querySelector("h3").textContent = p.title;
    node.querySelector(".use").textContent = p.use;

    const pre = node.querySelector("pre");
    const fields = node.querySelector(".fields");
    const progress = node.querySelector(".progress");
    const reset = node.querySelector(".reset");
    const btn = node.querySelector(".copy");

    const update = () => {
      pre.innerHTML = previewHtml(p.prompt, vals);
      const done = keys.filter((k) => vals[k] && vals[k].trim()).length;
      progress.textContent = keys.length
        ? `${done} of ${keys.length} details filled in`
        : "Ready to copy as-is";
      reset.hidden = done === 0;
    };

    const inputs = keys.map((key, i) => {
      const d = describe(key);
      const id = `f-${idx}-${i}`;
      const wrap = document.createElement("div");
      wrap.className = "field" + (d.long ? " long" : "");
      const lab = document.createElement("label");
      lab.htmlFor = id;
      lab.textContent = d.label;
      const input = document.createElement(d.long ? "textarea" : "input");
      input.id = id;
      if (d.long) input.rows = 4;
      else input.type = "text";
      input.placeholder = d.hint || (d.long ? "Paste here (remove names and identifiers)" : "");
      input.value = vals[key] || "";
      input.addEventListener("input", () => { vals[key] = input.value; update(); });
      wrap.append(lab, input);
      fields.appendChild(wrap);
      return input;
    });

    reset.onclick = () => {
      keys.forEach((k) => delete vals[k]);
      inputs.forEach((el) => (el.value = ""));
      update();
      inputs[0] && inputs[0].focus();
    };

    btn.onclick = () => {
      const left = keys.filter((k) => !(vals[k] && vals[k].trim())).length;
      copy(fill(p.prompt, vals), btn, left && left < keys.length ? `Copied (${left} left blank)` : "Copied!");
    };

    // Open the finished prompt in claude.ai using the visitor's own account.
    // The prompt is copied first as a fallback (e.g. if they have to sign in, or the
    // prompt is too long to pre-fill through the link).
    const openBtn = node.querySelector(".open-claude");
    openBtn.onclick = () => {
      const text = fill(p.prompt, vals);
      const encoded = encodeURIComponent(text);
      const url = encoded.length <= MAX_PREFILL
        ? `https://claude.ai/new?q=${encoded}`
        : "https://claude.ai/new";
      copy(text, openBtn, encoded.length <= MAX_PREFILL ? "Opened (also copied)" : "Copied: paste in Claude", "Open in Claude ↗");
      window.open(url, "_blank", "noopener,noreferrer");
    };

    update();
    return node;
  }

  // ---------- Filters ----------

  function renderChips() {
    const cats = [...new Set(
      prompts.filter((p) => state.sector === "all" || p.sector === state.sector).map((p) => p.category)
    )];
    if (!cats.includes(state.category)) state.category = null;
    chips.innerHTML = "";
    ["All topics", ...cats].forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "chip" + ((i === 0 ? !state.category : state.category === c) ? " active" : "");
      b.textContent = c;
      b.onclick = () => { state.category = i === 0 ? null : c; renderChips(); renderCards(); };
      chips.appendChild(b);
    });
  }

  function renderCards() {
    const q = state.query.toLowerCase();
    const list = prompts.filter((p) =>
      (state.sector === "all" || p.sector === state.sector) &&
      (!state.category || p.category === state.category) &&
      (!q || [p.title, p.use, p.prompt, p.category].join(" ").toLowerCase().includes(q))
    );
    count.textContent = `${list.length} prompt${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = "";
    if (!list.length) {
      grid.innerHTML = '<p class="empty">No prompts match. Try a different search.</p>';
      return;
    }
    list.forEach((p) => grid.appendChild(buildCard(p, prompts.indexOf(p))));
  }

  async function copy(text, btn, doneLabel, resetLabel = "Copy prompt") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove();
    }
    btn.textContent = doneLabel;
    btn.classList.add("done");
    setTimeout(() => { btn.textContent = resetLabel; btn.classList.remove("done"); }, 2200);
  }

  document.querySelectorAll(".tab").forEach((t) => {
    t.onclick = () => {
      document.querySelectorAll(".tab").forEach((x) => {
        x.classList.toggle("active", x === t);
        x.setAttribute("aria-selected", x === t);
      });
      state.sector = t.dataset.sector;
      renderChips(); renderCards();
    };
  });
  document.getElementById("search").addEventListener("input", (e) => {
    state.query = e.target.value.trim(); renderCards();
  });

  // Respect "reduce motion": hold the hero video on its first frame.
  const video = document.getElementById("hero-video");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const applyMotion = () => {
    if (!video) return;
    if (reduce.matches) { video.pause(); video.currentTime = 0; }
    else video.play().catch(() => {});
  };
  reduce.addEventListener?.("change", applyMotion);
  applyMotion();

  renderChips();
  renderCards();
})();
