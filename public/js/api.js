// public/js/api.js
// Simple API wrapper. Change BASE if your serverless endpoints are different.
const API = {
  BASE: "/api",
  endpoints: {
    getAnimes: "/getAnimes",
    getSeries: "/getSeries",       // expects ?id= or ?slug=
    getEpisodes: "/getEpisodes",   // expects ?seriesId=
    getEpisode: "/getEpisode",     // expects ?id=
    addAnime: "/addAnime",
    addEpisode: "/addEpisode",
    addSchedule: "/addSchedule",
    search: "/search",
    reportError: "/reportError"
  }
};

async function apiGet(path) {
  try {
    const res = await fetch(`${API.BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API GET ${path} failed ${res.status}`);
    return await res.json();
  } catch (err) {
    throw err;
  }
}

async function apiPost(path, body) {
  try {
    const res = await fetch(`${API.BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API POST ${path} failed ${res.status} ${text}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

window.api = {
  getAnimes: () => apiGet(API.endpoints.getAnimes),
  getSeries: (q) => apiGet(`${API.endpoints.getSeries}${q ? "?" + q : ""}`),
  getEpisodes: (q) => apiGet(`${API.endpoints.getEpisodes}${q ? "?" + q : ""}`),
  getEpisode: (q) => apiGet(`${API.endpoints.getEpisode}${q ? "?" + q : ""}`),
  addAnime: (doc) => apiPost(API.endpoints.addAnime, doc),
  addEpisode: (doc) => apiPost(API.endpoints.addEpisode, doc),
  addSchedule: (doc) => apiPost(API.endpoints.addSchedule, doc),
  search: (q) => apiGet(`${API.endpoints.search}?q=${encodeURIComponent(q)}`),
  reportError: (payload) => apiPost(API.endpoints.reportError, payload)
};
