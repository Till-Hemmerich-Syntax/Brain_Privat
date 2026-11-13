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
const cur = dv.current();
let wait = TASKS.filter((t) => !t.completed && isWait(t));
if (opts.forCurrent) wait = wait.filter((t) => linksTo(t, cur.file.path));
if (!wait.length) {
  el(dv.container, "div", "brain-empty", "Niemand schuldet dir gerade etwas.");
} else {
  const groups = new Map();
  for (const t of wait) {
    const p = personOf(t);
    const key = p ? p.file.path : "Ohne Person";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(t);
  }
  const grid = el(dv.container, "div", "brain-wait");
  for (const [key, list] of [...groups.entries()].sort((a, b) => b[1].length - a[1].length)) {
    const card = el(grid, "div", "brain-wait-card");
    const head = el(card, "div", "brain-wait-head");
    if (key === "Ohne Person") el(head, "span", "", key); else link(head, key);
    pill(head, String(list.length), "var(--brain-accent)");
    for (const t of list.sort((a, b) => (a.created || TODAY) - (b.created || TODAY))) {
      const row = el(card, "div", "brain-wait-row");
      el(row, "span", "txt", cleanText(t.text));
      const age = t.created ? Math.round(TODAY.diff(t.created.startOf("day"), "days").days) : null;
      const meta = el(row, "span", "age" + (age !== null && age > 7 ? " late" : ""), t.due ? rel(t.due) : age !== null ? `seit ${age} T.` : "");
      link(meta, t.path, " ↗", "src");
    }
  }
}
