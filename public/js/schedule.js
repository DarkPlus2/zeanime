// public/js/schedule.js
// Functions to compute estimated schedules based on episode release history.
// In production, run heavy calculations on server.

async function estimateNextRelease(seriesId, lookback = 6) {
  try {
    const eps = await api.getEpisodes(`seriesId=${encodeURIComponent(seriesId)}`);
    if (!eps || eps.length < 2) return null;
    // sort descending
    const sorted = eps.slice().sort((a,b) => new Date(b.createdAt||b.releasedAt||0) - new Date(a.createdAt||a.releasedAt||0));
    const diffs = [];
    for (let i = 0; i < Math.min(sorted.length-1, lookback); i++) {
      const a = new Date(sorted[i].createdAt || sorted[i].releasedAt || 0);
      const b = new Date(sorted[i+1].createdAt || sorted[i+1].releasedAt || 0);
      const d = Math.abs(a - b);
      if (d > 0) diffs.push(d);
    }
    if (!diffs.length) return null;
    diffs.sort((x,y)=>x-y);
    const median = diffs[Math.floor(diffs.length/2)];
    const last = new Date(sorted[0].createdAt || sorted[0].releasedAt || Date.now());
    return new Date(last.getTime() + median).toISOString();
  } catch (err) {
    console.error("Estimate failed", err);
    return null;
  }
}

window.scheduleUtils = { estimateNextRelease };
