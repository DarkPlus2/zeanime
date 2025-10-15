// public/js/catalog.js
async function loadCatalog(opts = {}) {
  // opts: { type, genre, q, page, perPage }
  const grid = document.getElementById("catalogGrid");
  const genreFilter = document.getElementById("genreFilter");
  const typeFilter = document.getElementById("typeFilter");
  const hindiOnly = document.getElementById("hindiOnly");
  const sortBy = document.getElementById("sortBy");

  try {
    // read filters from URL if present
    const params = new URLSearchParams(location.search);
    const type = opts.type || params.get("type") || (typeFilter ? typeFilter.value : "");
    const genre = opts.genre || params.get("genre") || (genreFilter ? genreFilter.value : "");
    const q = params.get("q") || "";

    let animes = await api.getAnimes();
    if (!Array.isArray(animes)) animes = [];

    // Filter
    if (type) animes = animes.filter(a => a.type === type);
    if (genre) animes = animes.filter(a => (a.genres||[]).includes(genre));
    if (opts.hindiOnly || (hindiOnly && hindiOnly.checked)) animes = animes.filter(a => a.hindiDub);

    // Search
    if (q) {
      const ql = q.toLowerCase();
      animes = animes.filter(a => (a.title || "").toLowerCase().includes(ql) || (a.description || "").toLowerCase().includes(ql));
    }

    // Sort
    const sort = (sortBy && sortBy.value) || "latest";
    if (sort === "latest") animes.sort((a,b)=> new Date(b.createdAt||0) - new Date(a.createdAt||0));
    if (sort === "az") animes.sort((a,b)=> (a.title||"").localeCompare(b.title||""));
    if (sort === "pop") animes.sort((a,b)=> (b.views||0) - (a.views||0));

    // Render
    grid.innerHTML = "";
    animes.forEach(a => {
      const card = utils.el("div", { class: "card" },
        utils.el("img", { src: a.poster || "/assets/placeholder.jpg", alt: a.title }),
        utils.el("h3", { text: a.title }),
        utils.el("p", { text: (a.genres || []).slice(0,3).join(", ") }),
        utils.el("div", { class: "card-actions" },
          utils.el("a", { href: `/series.html?id=${encodeURIComponent(a._id)}`, text: "View" })
        )
      );
      grid.appendChild(card);
    });

    // populate genre filter if present
    if (genreFilter) {
      const genres = new Set();
      const all = await api.getAnimes();
      all.forEach(s => (s.genres||[]).forEach(g => genres.add(g)));
      const arr = Array.from(genres).sort();
      genreFilter.innerHTML = `<option value="">All</option>` + arr.map(g=>`<option value="${g}">${g}</option>`).join("");
      if (params.get("genre")) genreFilter.value = params.get("genre");
    }

  } catch (err) {
    console.error("Catalog load failed", err);
    utils.showError("Failed to load catalog.");
  }
}

// wire up filters if HTML has them
document.addEventListener("DOMContentLoaded", () => {
  const genreFilter = utils.qs("#genreFilter");
  const typeFilter = utils.qs("#typeFilter");
  const hindiOnly = utils.qs("#hindiOnly");
  const sortBy = utils.qs("#sortBy");

  if (genreFilter) genreFilter.addEventListener("change", ()=> loadCatalog({}));
  if (typeFilter) typeFilter.addEventListener("change", ()=> loadCatalog({}));
  if (hindiOnly) hindiOnly.addEventListener("change", ()=> loadCatalog({}));
  if (sortBy) sortBy.addEventListener("change", ()=> loadCatalog({}));

  // initial load (if page calls loadCatalog with type, that will override)
  if (!window._catalogInit) { loadCatalog(); window._catalogInit = true; }
});
