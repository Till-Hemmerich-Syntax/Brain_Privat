---
cssclasses:
  - brain-dash
---
# Meetings

```dataviewjs
await dv.view("99 System/Scripts/chart", {"weeks": 12})
```

## Zuletzt
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"limit": 15})
```

## Archiv
```dataview
TABLE WITHOUT ID file.link AS Meeting, datum AS Datum, projekte AS Projekte, length(filter(file.tasks, (t) => !t.completed)) AS Offen
FROM "40 Meetings"
WHERE type = "meeting"
SORT datum DESC
```
