// public/js/watch.js
async function initWatch() {
  const epParam = utils.parseIdParam("episodeId");
  const seriesId = utils.parseIdParam("seriesId");
  const epNum = utils.parseIdParam("ep");

  try {
    let episode;
    let series;

    if (epParam) {
      const res = await api.getEpisode(`id=${encodeURIComponent(epParam)}`);
      episode = Array.isArray(res) ? res[0] : res;
      // load parent series for sidebar info
      if (episode && episode.seriesId) {
        series = (await api.getSeries(`id=${encodeURIComponent(episode.seriesId)}`))[0];
      }
    } else if (seriesId && epNum) {
      // fetch series and episodes, pick epNum
      series = (await api.getSeries(`id=${encodeURIComponent(seriesId)}`))[0];
      const eps = await api.getEpisodes(`seriesId=${encodeURIComponent(seriesId)}`);
      episode = eps.find(x => String(x.epNum) === String(epNum)) || eps[0];
    } else {
      // fallback: pick first anime first episode
      const animes = await api.getAnimes();
      series = animes[0];
      episode = (series && series.episodes && series.episodes[0]) || null;
    }

    if (!episode) throw new Error("Episode not found");

    renderEpisode(series, episode);
    bindEpisodeList(series, episode);

  } catch (err) {
    console.error("Watch init failed", err);
    utils.showError("Failed to load episode. Try again.");
  }
}

function renderEpisode(series, episode) {
  const titleEl = utils.qs("#anime-title");
  if (titleEl) titleEl.textContent = series ? series.title : (episode.title || "Episode");
  const epListEl = utils.qs("#episode-list');

  // servers
  const serverSelect = utils.qs("#serverSelect");
  serverSelect.innerHTML = "";
  (episode.servers || episode.embedLinks ? Object.keys(episode.embedLinks || {}) : []).forEach(key => {
    const opt = utils.el("option", { value: key }, key);
    serverSelect.appendChild(opt);
  });

  function loadServerByKey(key) {
    const url = (episode.embedLinks && episode.embedLinks[key]) || null;
    const playerWrap = utils.qs("#player-wrap");
    playerWrap.innerHTML = "";
    if (!url) { playerWrap.innerHTML = "<p>No stream available on this server.</p>"; return; }

    // embed hosts (iframe)
    if (url.startsWith("http")) {
      // choose iframe for embed hosts
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.width = "100%";
      iframe.height = "600";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("frameborder", "0");
      playerWrap.appendChild(iframe);

      // if embed fails (onload error), show message and let admin know
      iframe.addEventListener("error", () => utils.showError("Embed failed. Try another server."));
    } else {
      // treat as direct HLS stream
      const video = document.createElement("video");
      video.controls = true;
      video.width = 960;
      playerWrap.appendChild(video);
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else if (window.Hls && Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      } else {
        playerWrap.innerHTML = "<p>Your browser can't play this stream.</p>";
      }
      // skip intro button (if ranges present)
      if ((episode.skipRanges || []).length) {
        const skipBtn = utils.el("button", { class: "btn small" }, "Skip Intro");
        skipBtn.addEventListener("click", () => {
          const r = episode.skipRanges[0];
          if (video) video.currentTime = r.end || r.start || 0;
        });
        playerWrap.appendChild(skipBtn);
      }
    }
  }

  // initial server load
  if (serverSelect.options.length) {
    loadServerByKey(serverSelect.value);
    serverSelect.addEventListener("change", (e)=> loadServerByKey(e.target.value));
  }

  // schedule display
  const scheduleWrap = utils.qs("#schedule");
  if (series && series.nextEpisodeSchedule) {
    scheduleWrap.innerHTML = `<p>Next ep #${series.nextEpisodeSchedule.episode} — <strong>${new Date(series.nextEpisodeSchedule.estimatedDate).toLocaleString()}</strong></p>`;
  } else {
    scheduleWrap.innerHTML = "<p>No schedule available.</p>";
  }

  // about and qtip
  utils.qs("#aboutSection").innerHTML = `<h4>About</h4><p>${series.aboutInfo || series.description || ""}</p>`;
  utils.qs("#qtipSection").innerHTML = `<h4>Qtip</h4><p>${series.qtipInfo || ""}</p>`;
}

async function bindEpisodeList(series, currentEpisode) {
  try {
    const episodes = series.episodes || (await api.getEpisodes(`seriesId=${encodeURIComponent(series._id)}`));
    const listWrap = utils.qs("#episode-list");
    listWrap.innerHTML = "";
    episodes.forEach(ep => {
      const item = utils.el("div", { class: "ep-item" },
        utils.el("a", { href: `#` }, `S${ep.season||1}E${ep.epNum || ep.episode_number} — ${ep.title}`)
      );
      item.addEventListener("click", (ev) => {
        ev.preventDefault();
        // reload page with selected episode
        location.href = `/watch.html?seriesId=${encodeURIComponent(series._id)}&ep=${encodeURIComponent(ep.epNum||ep.id)}`;
      });
      listWrap.appendChild(item);
    });
  } catch (err) {
    console.error("Failed to bind episode list", err);
  }
}

window.initWatch = initWatch;
