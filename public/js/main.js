// public/js/main.js
(async function(){
  const featuredRow = document.getElementById("featured-row");
  const latestRow = document.getElementById("latest-row");
  const genresRow = document.getElementById("genres-row");

  try {
    const animes = await api.getAnimes();
    if (!Array.isArray(animes)) throw new Error("Invalid response");

    // Featured: top 6 newest
    const featured = animes.slice(0,6);
    featured.forEach(a => {
      const card = utils.el("div", { class: "card" }, 
        utils.el("img", { src: a.poster || "/assets/placeholder.jpg", alt: a.title }),
        utils.el("h3", { text: a.title })
      );
      card.addEventListener("click", ()=> location.href = `/series.html?id=${encodeURIComponent(a._id)}`);
      featuredRow.appendChild(card);
    });

    // Latest Episodes (flatten episodes with parent anime)
    const latest = [];
    animes.forEach(a => {
      (a.episodes || []).slice(-3).forEach(ep => {
        latest.push({ anime: a, ep });
      });
    });
    latest.sort((x,y) => {
      const da = new Date(x.ep.createdAt||0);
      const db = new Date(y.ep.createdAt||0);
      return db - da;
    });
    latest.slice(0,12).forEach(item => {
      const card = utils.el("div", { class: "card small" },
        utils.el("img", { src: item.anime.poster || "/assets/placeholder.jpg" }),
        utils.el("div", {}, utils.el("h4", { text: `${item.anime.title} — ${item.ep.title}` }))
      );
      card.addEventListener("click", ()=> location.href = `/watch.html?seriesId=${item.anime._id}&ep=${encodeURIComponent(item.ep.epNum||item.ep.id)}`);
      latestRow.appendChild(card);
    });

    // Genres chips
    const genreSet = new Set();
    animes.forEach(a => (a.genres||[]).forEach(g => genreSet.add(g)));
    Array.from(genreSet).slice(0,20).forEach(g => {
      const chip = utils.el("button", { class: "chip" }, g);
      chip.addEventListener("click", ()=> location.href = `/catalog.html?genre=${encodeURIComponent(g)}`);
      genresRow.appendChild(chip);
    });

  } catch (err) {
    console.error("Home load failed", err);
    utils.showError("Failed to load home content.");
  }
})();
