---
cssclasses:
  - brain-dash
---
```dataviewjs
await dv.view("99 System/Scripts/hero", {"kicker": "Privat · Second Brain", "links": [["✅ Todos", "99 System/Dashboards/Todos.md"], ["📁 Projekte", "99 System/Dashboards/Projekte.md"], ["👥 Personen", "99 System/Dashboards/Personen.md"]]})
```

```dataviewjs
await dv.view("99 System/Scripts/stats")
```

## Heute & überfällig
```tasks
not done
due before tomorrow
tags do not include #warten
tags do not include #prüfen
sort by due
sort by priority
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

## Aktive Projekte
```dataviewjs
await dv.view("99 System/Scripts/projects", {"status": ["aktiv"]})
```

## Bereiche
```dataviewjs
await dv.view("99 System/Scripts/projects", {"type": "bereich"})
```

## Warten auf
```dataviewjs
await dv.view("99 System/Scripts/waiting")
```

## Rhythmus
```dataviewjs
await dv.view("99 System/Scripts/chart", {"weeks": 8, "series": ["done", "created"]})
```

