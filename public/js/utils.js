// public/js/utils.js
function el(tag, attrs = {}, ...children) {
  const $ = document.createElement(tag);
  for (const k in attrs) {
    if (k === "class") $.className = attrs[k];
    else if (k === "text") $.textContent = attrs[k];
    else $.setAttribute(k, attrs[k]);
  }
  children.flat().forEach(ch => {
    if (typeof ch === "string") $.appendChild(document.createTextNode(ch));
    else if (ch instanceof Node) $.appendChild(ch);
  });
  return $;
}

function showError(str) {
  const b = document.getElementById("error-banner");
  if (!b) {
    console.error("Error banner not found:", str);
    return;
  }
  b.hidden = false;
  b.textContent = str;
  b.classList.add("visible");
  setTimeout(() => { b.hidden = true; b.classList.remove("visible"); }, 6000);
}

function qs(sel, parent = document) { return parent.querySelector(sel); }
function qsa(sel, parent = document) { return Array.from(parent.querySelectorAll(sel)); }

function debounce(fn, wait = 300) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); };
}

function parseIdParam(name = "id") {
  const p = new URLSearchParams(location.search);
  return p.get(name);
}

window.utils = { el, showError, qs, qsa, debounce, parseIdParam };
