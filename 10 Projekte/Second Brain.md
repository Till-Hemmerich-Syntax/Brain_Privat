---
type: projekt
status: aktiv
prio: hoch
icon: 🧠
bereich: "[[Tools & Setup]]"
start: 2026-11-13
ziel:
beschreibung: Zwei Obsidian-Vaults (Arbeit und Privat), gepflegt von Claude, gespeist aus Wispr Flow.
aliases: ["Obsidian", "Obsidian Vault", "Meeting-Todos"]
---
```dataviewjs
await dv.view("99 System/Scripts/project-panel")
```

> [!kontext] Worum geht es
> Ein zweites Gehirn, getrennt in Arbeit und Privat. Claude pflegt alles, Till liest Dashboards und hakt Todos ab.
> Beide Vaults liegen auf dem Laptop, jeder in einem eigenen Git-Repo.

## Stand
- Vaults gebaut am 13.11.2026 mit Minimal-Theme, Dataview, Tasks, Obsidian Git und eigenen Dashboards.
- Arbeits-Vault mit den Meetings ab 05.11. befüllt.
- Übergangsweise läuft ein stündlicher Task, der Meeting-Todos in ein Claude Sheet schreibt.

## Todos
- [ ] GitHub-Repos anlegen (Arbeit in der Org syntaxinstitut, Privat im eigenen Account) und Remotes eintragen [[Second Brain]] 📅 2026-11-16 ➕ 2026-11-13
- [ ] Meeting-Task von Sheet auf Arbeits-Vault umstellen lassen [[Second Brain]] ➕ 2026-11-13

```dataviewjs
await dv.view("99 System/Scripts/project-tasks")
```

## Meetings
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"forCurrent": "projekt", "limit": 20})
```
