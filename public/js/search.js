// public/js/search.js
const suggestionBox = utils.qs("#suggestions");
const searchInput = utils.qs("#searchInput");

async function renderResults(results) {
  const grid = utils.qs("#resultsGrid");
  grid.innerHTML = "";
  if (!results || !results.length) {
    grid.innerHTML = "<p>No results found.</p>";
    return;
  }
  results.forEach(a => {
    const card = utils.el("div", { class: "card" },
      utils.el("img", { src: a.poster || "/assets/placeholder.jpg" }),
      utils.el("h3", { text: a.title }),
      utils.el("p", { text: (a.genres||[]).join(", ") }),
      utils.el("a", { href: `/series.html?id=${encodeURIComponent(a._id)}`, text: "View" })
    );
    grid.appendChild(card);
  });
}

async function searchRun(q) {
  try {
    const res = await api.search(q);
    // API should return array of documents
    renderResults(res || []);
  } catch (err) {
    console.error("Search failed", err);
    utils.showError("Search failed. Try again later.");
  }
}

if (searchInput) {
  const doSuggest = utils.debounce(async (val) => {
    if (!val) { suggestionBox.innerHTML = ""; return; }
    try {
      const results = await api.search(val);
      suggestionBox.innerHTML = results.slice(0,6).map(a => `<div class="sug" data-id="${a._id}">${a.title}</div>`).join("");
      suggestionBox.querySelectorAll(".sug").forEach(el => {
        el.addEventListener("click", () => {
          location.href = `/series.html?id=${encodeURIComponent(el.dataset.id)}`;
        });
      });
    } catch (err) {
      console.error("Suggest failed", err);
    }
  }, 250);

  searchInput.addEventListener("input", (e) => doSuggest(e.target.value));
}
