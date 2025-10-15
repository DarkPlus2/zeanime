// public/js/azlist.js
document.addEventListener("DOMContentLoaded", async () => {
  const azNav = document.getElementById("azNav");
  const azGrid = document.getElementById("azGrid");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  letters.forEach(l => {
    const b = utils.el("button", { class: "az-btn" }, l);
    b.addEventListener("click", () => loadLetter(l));
    azNav.appendChild(b);
  });

  async function loadLetter(letter) {
    azGrid.innerHTML = "Loading...";
    try {
      const animes = await api.getAnimes();
      const list = animes.filter(a => (a.title||"").charAt(0).toUpperCase() === letter);
      azGrid.innerHTML = "";
      list.forEach(a => {
        const card = utils.el("div", { class: "card" },
          utils.el("img", { src: a.poster || "/assets/placeholder.jpg" }),
          utils.el("h3", { text: a.title })
        );
        card.addEventListener("click", ()=> location.href = `/series.html?id=${encodeURIComponent(a._id)}`);
        azGrid.appendChild(card);
      });
    } catch (err) {
      console.error(err);
      utils.showError("Failed to load A–Z list.");
    }
  }

  // optional: load A by default
  loadLetter("A");
});
