// public/js/admin.js
document.addEventListener("DOMContentLoaded", initAdmin);

async function initAdmin() {
  try {
    await loadSeriesList();
    await populateSeriesSelects();
    bindForms();
    loadSchedules();
  } catch (err) {
    console.error("Admin init error", err);
    utils.showError("Admin panel failed to load.");
  }
}

async function loadSeriesList() {
  const list = document.getElementById("seriesList");
  list.innerHTML = "Loading...";
  try {
    const animes = await api.getAnimes();
    list.innerHTML = "";
    animes.forEach(a => {
      const row = utils.el("div", { class: "admin-row" },
        utils.el("img", { src: a.poster || "/assets/placeholder.jpg", width: 80 }),
        utils.el("div", {}, utils.el("h4", { text: a.title }), utils.el("p", { text: (a.genres||[]).join(", ") })),
        utils.el("div", { class: "admin-actions" },
          utils.el("button", { class: "btn" , "data-id": a._id, text: "Edit" }),
          utils.el("button", { class: "btn danger", "data-id": a._id, text: "Delete" })
        )
      );
      // edit & delete handlers
      row.querySelectorAll("button").forEach(btn=>{
        btn.addEventListener("click", async ()=> {
          const id = btn.getAttribute("data-id");
          if (btn.textContent === "Delete") {
            if (!confirm("Delete series?")) return;
            try {
              await fetch(`/api/deleteSeries?id=${encodeURIComponent(id)}`, { method: "POST" });
              loadSeriesList();
            } catch (e) { utils.showError("Delete failed"); }
          } else {
            // simple edit prompt flow (could be improved)
            const title = prompt("New title:");
            if (title) {
              try {
                await fetch(`/api/updateSeries?id=${encodeURIComponent(id)}`, {
                  method: "POST",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify({ title })
                });
                loadSeriesList();
              } catch (e) { utils.showError("Update failed"); }
            }
          }
        });
      });

      list.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Failed to load series</p>";
  }
}

async function populateSeriesSelects() {
  const sel1 = document.getElementById("episodeSeriesSelect");
  const sel2 = document.getElementById("scheduleSeriesSelect");
  const sel3 = document.getElementById("episodeSeries"); // if present in other form
  if (!sel1 && !sel2 && !sel3) return;
  try {
    const animes = await api.getAnimes();
    const opts = animes.map(a => `<option value="${a._id}">${a.title}</option>`).join("");
    if (sel1) sel1.innerHTML = opts;
    if (sel2) sel2.innerHTML = opts;
    if (sel3) sel3.innerHTML = opts;
  } catch (err) {
    console.error("Populate selects failed", err);
  }
}

function bindForms() {
  const seriesForm = document.getElementById("seriesForm");
  if (seriesForm) seriesForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(seriesForm);
    const doc = {
      title: fd.get("title"),
      slug: fd.get("slug") || undefined,
      poster: fd.get("poster") || undefined,
      description: fd.get("description") || undefined,
      genres: fd.get("genres") ? fd.get("genres").split(",").map(s=>s.trim()) : [],
      hindiDub: !!fd.get("hindiDub"),
      type: fd.get("type") || "series"
    };
    try {
      await api.addAnime(doc);
      utils.showError("Series added");
      seriesForm.reset();
      loadSeriesList();
      populateSeriesSelects();
    } catch (err) {
      console.error(err);
      utils.showError("Add series failed");
    }
  });

  const episodeForm = document.getElementById("episodeForm");
  if (episodeForm) episodeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(episodeForm);
    const doc = {
      seriesId: fd.get("seriesId"),
      epNum: fd.get("epNum"),
      title: fd.get("title"),
      embedLinks: {
        abyss: fd.get("abyss") || "",
        filemoon: fd.get("filemoon") || ""
      },
      hindiDub: !!fd.get("hindiDub")
    };
    try {
      await api.addEpisode(doc);
      utils.showError("Episode added");
      episodeForm.reset();
      loadSeriesList();
    } catch (err) {
      console.error(err);
      utils.showError("Add episode failed");
    }
  });

  const scheduleForm = document.getElementById("scheduleForm");
  if (scheduleForm) scheduleForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(scheduleForm);
    const doc = {
      seriesId: fd.get("seriesId"),
      nextEpisode: fd.get("nextEpisode"),
      estimatedDate: fd.get("estimatedDate")
    };
    try {
      await api.addSchedule(doc);
      utils.showError("Schedule added");
      scheduleForm.reset();
      loadSchedules();
    } catch (err) {
      console.error(err);
      utils.showError("Add schedule failed");
    }
  });
}

async function loadSchedules() {
  try {
    const res = await fetch("/api/getSchedules");
    if (!res.ok) throw new Error("Schedules fetch failed");
    const schedules = await res.json();
    const wrap = document.getElementById("scheduleList");
    wrap.innerHTML = schedules.map(s => `<div class="sched">
      <strong>${s.seriesTitle || s.seriesId}</strong> — Ep ${s.nextEpisode} — ${new Date(s.estimatedDate).toLocaleString()}
    </div>`).join("");
  } catch (err) {
    console.error(err);
  }
}
