// public/js/errors.js
(function () {
  // Report to /api/reportError (server should persist to logs/DB)
  async function report(payload) {
    try {
      navigator.sendBeacon && navigator.sendBeacon
        ? navigator.sendBeacon("/api/reportError", JSON.stringify(payload))
        : await fetch("/api/reportError", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
    } catch (e) {
      // keep in localstorage for later retry
      const pending = JSON.parse(localStorage.getItem("error_reports") || "[]");
      pending.push(payload);
      localStorage.setItem("error_reports", JSON.stringify(pending));
    }
  }

  window.addEventListener("error", ev => {
    const payload = {
      type: "error",
      message: ev.message || String(ev),
      filename: ev.filename,
      lineno: ev.lineno,
      stack: ev.error ? ev.error.stack : null,
      url: location.href,
      ts: Date.now()
    };
    console.error("Captured error:", payload.message);
    report(payload);
  });

  window.addEventListener("unhandledrejection", ev => {
    const payload = {
      type: "unhandledrejection",
      reason: ev.reason ? (ev.reason.stack || JSON.stringify(ev.reason)) : "unknown",
      url: location.href,
      ts: Date.now()
    };
    console.error("Unhandled rejection:", payload.reason);
    report(payload);
  });

  // flush stored reports on load
  window.addEventListener("load", async () => {
    const pending = JSON.parse(localStorage.getItem("error_reports") || "[]");
    if (pending.length) {
      for (const p of pending) {
        try {
          await fetch("/api/reportError", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p)
          });
        } catch (e) { /* leave it */ }
      }
      localStorage.removeItem("error_reports");
    }
  });
})();
