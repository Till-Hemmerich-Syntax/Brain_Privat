---
type: projekt
status: aktiv
prio: mittel
icon: 📁
bereich:
start: "{{date}}"
ziel:
beschreibung:
aliases: []
---
```dataviewjs
await dv.view("99 System/Scripts/project-panel")
```

> [!kontext] Worum geht es
>

## Stand


## Entscheidungen
- {{date}} ·

## Offene Fragen
-

## Todos
```dataviewjs
await dv.view("99 System/Scripts/project-tasks")
```

## Meetings
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"forCurrent": "projekt", "limit": 20})
```
