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

const open = TASKS.filter((t) => !t.completed);
const mine = open.filter(isMine);
const due = mine.filter((t) => t.due && t.due.startOf("day") <= TODAY);
const overdue = mine.filter((t) => t.due && t.due.startOf("day") < TODAY);
const week = mine.filter((t) => t.due && t.due.startOf("day") > TODAY && t.due <= TODAY.plus({ days: 7 }));
const wait = open.filter(isWait);
const check = open.filter(isCheck);
const projects = PAGES.where((p) => p.type === "projekt" && p.status === "aktiv").length;
const meetings = PAGES.where((p) => p.type === "meeting" && p.datum && p.datum >= TODAY.minus({ days: 7 })).length;

const tiles = [
  ["Fällig heute", due.length, overdue.length ? `${overdue.length} überfällig` : "alles im Plan", overdue.length ? "alert" : due.length ? "warn" : "ok"],
  ["Nächste 7 Tage", week.length, "mit Datum", ""],
  ["Meine offenen", mine.length, "Todos gesamt", "accent"],
  ["Warten auf", wait.length, "delegiert", ""],
  ["Zu prüfen", check.length, "noch aktuell?", check.length ? "warn" : ""],
  ["Aktive Projekte", projects, `${meetings} Meetings / 7 T.`, ""],
];
const grid = el(dv.container, "div", "brain-tiles");
for (const [label, value, hint, kind] of tiles) {
  const t = el(grid, "div", "brain-tile " + kind);
  el(t, "div", "l", label);
  el(t, "div", "v", value);
  el(t, "div", "h", hint);
}
