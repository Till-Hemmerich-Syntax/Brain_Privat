// ===== Gemeinsame Helfer (wird vom Build in jede View kopiert) =====
const EXCL = ["99 System", "90 Archiv"];
const inScope = (p) => !EXCL.some((e) => p.file.path.startsWith(e));
const PAGES = dv.pages().where(inScope);
const TASKS = PAGES.file.tasks.array();
const TODAY = dv.date("today");
const tagsOf = (t) => (t.tags || []).map((x) => x.toLowerCase());
const isWait = (t) => tagsOf(t).includes("#warten");
const isCheck = (t) => tagsOf(t).includes("#prüfen");
const isMine = (t) => !isWait(t) && !isCheck(t);
const pageOf = (path) => (path ? dv.page(path) : null);

function personOf(t) {
  for (const l of t.outlinks || []) {
    const p = pageOf(l.path);
    if (p && p.type === "person") return p;
  }
  return null;
}
const _rc = new Map();
function resolve(l) {
  if (!l) return null;
  const raw = l.path !== undefined ? l.path : String(l);
  if (_rc.has(raw)) return _rc.get(raw);
  const pg = dv.page(raw);
  const r = pg ? pg.file.path : raw;
  _rc.set(raw, r);
  return r;
}
const hasLink = (arr, path) => (Array.isArray(arr) ? arr : arr ? [arr] : []).some((l) => resolve(l) === path);
function linksTo(t, path) {
  return t.path === path || hasLink(t.outlinks, path);
}
function cleanText(s) {
  return String(s || "")
    .replace(/(?:\s*(?:\[\[[^\]]+\]\]|#[\p{L}\p{N}_\-/]+))+\s*(?=[📅⏳🛫➕✅❌🔺⏫🔼🔽⏬🔁]|$)/u, " ")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, (m, a) => a.split("/").pop())
    .replace(/#[\p{L}\p{N}_\-/]+/gu, "")
    .replace(/[📅⏳🛫➕✅❌🔺⏫🔼🔽⏬🔁🆔⛔]️?\s*[\d-]*/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
function rel(d) {
  if (!d) return "";
  const diff = Math.round(d.startOf("day").diff(TODAY, "days").days);
  if (diff === 0) return "heute";
  if (diff === 1) return "morgen";
  if (diff === -1) return "gestern";
  if (diff < 0) return `${-diff} T. drüber`;
  if (diff < 7) return d.setLocale("de").toFormat("cccc");
  return d.toFormat("dd.MM.");
}
function ago(d) {
  if (!d) return "";
  const diff = Math.round(TODAY.diff(d.startOf("day"), "days").days);
  if (diff <= 0) return "heute";
  if (diff === 1) return "gestern";
  if (diff < 14) return `vor ${diff} Tagen`;
  return `vor ${Math.round(diff / 7)} Wochen`;
}
function el(parent, tag, cls, text) {
  const e = parent.createEl(tag, { cls: cls || undefined });
  if (text !== undefined && text !== null) e.setText(String(text));
  return e;
}
function link(parent, path, label, cls) {
  const name = label || path.split("/").pop().replace(/\.md$/, "");
  return parent.createEl("a", {
    cls: "internal-link" + (cls ? " " + cls : ""),
    text: name,
    attr: { href: path, "data-href": path },
  });
}
function pill(parent, text, color) {
  const p = el(parent, "span", "brain-pill", text);
  if (color) p.style.setProperty("--pill", color);
  return p;
}
const STATUS_COLOR = {
  aktiv: "var(--color-green)",
  geplant: "var(--color-blue)",
  idee: "var(--color-purple)",
  pausiert: "var(--color-orange)",
  prüfen: "var(--color-yellow)",
  abgeschlossen: "var(--text-faint)",
};
const PRIO_ORDER = { hoch: 0, mittel: 1, niedrig: 2 };
// ===== Ende Helfer =====

const opts = input || {};
const weeks = opts.weeks || 8;
const start = TODAY.startOf("week").minus({ weeks: weeks - 1 });
const buckets = [];
for (let i = 0; i < weeks; i++) buckets.push({ from: start.plus({ weeks: i }), meetings: 0, done: 0, created: 0 });
const idx = (d) => {
  if (!d) return -1;
  const i = Math.floor(d.startOf("day").diff(start, "weeks").weeks);
  return i >= 0 && i < weeks ? i : -1;
};
for (const m of PAGES.where((p) => p.type === "meeting")) { const i = idx(m.datum ? dv.date(m.datum) : null); if (i >= 0) buckets[i].meetings++; }
for (const t of TASKS) {
  const i = idx(t.completion); if (i >= 0) buckets[i].done++;
  const j = idx(t.created); if (j >= 0) buckets[j].created++;
}

const wrap = el(dv.container, "div", "brain-charts");
function chart(title, key, cls) {
  const box = el(wrap, "div", "brain-chart-box");
  const head = el(box, "div", "brain-chart-head");
  el(head, "span", "", title);
  el(head, "span", "muted", `Ø ${(buckets.reduce((s, b) => s + b[key], 0) / weeks).toFixed(1)} / Woche`);
  const max = Math.max(1, ...buckets.map((b) => b[key]));
  const c = el(box, "div", "brain-chart " + (cls || ""));
  buckets.forEach((b, i) => {
    const col = el(c, "div", "col" + (i === weeks - 1 ? " now" : ""));
    el(col, "div", "num", b[key] || "");
    const bar = el(col, "div", "bar");
    bar.style.height = Math.max(3, (b[key] / max) * 100) + "%";
    el(col, "div", "lbl", "KW" + b.from.toFormat("W"));
  });
}
const DEF = { meetings: ["Meetings", ""], done: ["Todos erledigt", "green"], created: ["Todos neu", "orange"] };
for (const k of opts.series || ["meetings", "done", "created"]) chart(DEF[k][0], k, DEF[k][1]);
