(function () {
  const prompts = window.PROMPTS || [];
  const state = { sector: "all", category: null, query: "" };

  const grid = document.getElementById("grid");
  const chips = document.getElementById("chips");
  const count = document.getElementById("count");
  const tpl = document.getElementById("card-tpl");
  const label = { education: "Education", healthcare: "Healthcare" };

  const escapeHtml = (s) =>
    s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const highlight = (s) => escapeHtml(s).replace(/\[[^\]]+\]/g, (m) => `<mark>${m}</mark>`);

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
    list.forEach((p) => {
      const node = tpl.content.cloneNode(true);
      const badge = node.querySelector(".badge");
      badge.textContent = label[p.sector] || p.sector;
      badge.classList.add(p.sector);
      node.querySelector(".cat").textContent = p.category;
      node.querySelector("h3").textContent = p.title;
      node.querySelector(".use").textContent = p.use;
      node.querySelector("pre").innerHTML = highlight(p.prompt);
      const btn = node.querySelector(".copy");
      btn.onclick = () => copy(p.prompt, btn);
      grid.appendChild(node);
    });
  }

  async function copy(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove();
    }
    btn.textContent = "Copied!";
    btn.classList.add("done");
    setTimeout(() => { btn.textContent = "Copy prompt"; btn.classList.remove("done"); }, 1600);
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

  renderChips();
  renderCards();
})();
