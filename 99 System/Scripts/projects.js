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
const type = opts.type || "projekt";
const statuses = opts.status || (type === "projekt" ? ["aktiv"] : null);
let projects = PAGES.where((p) => p.type === type && (!statuses || statuses.includes(p.status))).array();
projects.sort((a, b) => (PRIO_ORDER[a.prio] ?? 3) - (PRIO_ORDER[b.prio] ?? 3) || String(a.file.name).localeCompare(b.file.name));

if (!projects.length) {
  el(dv.container, "div", "brain-empty", opts.empty || "Keine Projekte in diesem Status.");
} else {
  const grid = el(dv.container, "div", "brain-cards");
  for (const p of projects) {
    const tasks = TASKS.filter((t) => linksTo(t, p.file.path));
    const done = tasks.filter((t) => t.completed).length;
    const openT = tasks.filter((t) => !t.completed);
    const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
    const next = openT.filter((t) => t.due && isMine(t)).sort((a, b) => a.due - b.due)[0];
    const meetings = PAGES.where((m) => m.type === "meeting" && hasLink(m.projekte, p.file.path))
      .sort((m) => m.datum, "desc").array();

    const card = el(grid, "div", "brain-card");
    card.style.setProperty("--card-color", STATUS_COLOR[p.status] || "var(--brain-accent)");
    const top = el(card, "div", "brain-card-top");
    el(top, "span", "brain-icon", p.icon || "📁");
    if (p.status) pill(top, p.status, STATUS_COLOR[p.status]);
    if (p.prio === "hoch") pill(top, "Prio hoch", "var(--color-red)");
    link(el(card, "div", "brain-card-title"), p.file.path, p.file.name);
    if (p.beschreibung) el(card, "div", "brain-card-desc", p.beschreibung);
    if (tasks.length) {
      const bar = el(card, "div", "brain-bar");
      el(bar, "span").style.width = pct + "%";
    }
    const meta = el(card, "div", "brain-card-meta");
    el(meta, "span", "", tasks.length ? `${openT.length} offen · ${pct} %` : "keine Todos");
    if (type !== "projekt" && meetings.length) el(meta, "span", "", `${meetings.length} Meetings`);
    if (p.ziel) el(meta, "span", "", "Ziel " + dv.date(p.ziel).toFormat("dd.MM.yy"));
    if (next) {
      const n = el(card, "div", "brain-card-next");
      el(n, "span", "brain-next-when" + (next.due < TODAY ? " late" : ""), rel(next.due));
      el(n, "span", "", cleanText(next.text));
    } else if (meetings.length) {
      el(card, "div", "brain-card-next muted", "Letztes Meeting " + ago(dv.date(meetings[0].datum)));
    }
  }
}
