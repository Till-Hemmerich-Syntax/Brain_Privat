---
cssclasses:
  - brain-dash
---
# Projekte

## Aktiv
```dataviewjs
await dv.view("99 System/Scripts/projects", {"status": ["aktiv"], "empty": "Nichts hier."})
```

## Geplant
```dataviewjs
await dv.view("99 System/Scripts/projects", {"status": ["geplant"], "empty": "Nichts hier."})
```

## Ideen
```dataviewjs
await dv.view("99 System/Scripts/projects", {"status": ["idee"], "empty": "Nichts hier."})
```

## Stand unklar
```dataviewjs
await dv.view("99 System/Scripts/projects", {"status": ["prüfen"], "empty": "Nichts hier."})
```

## Pausiert
```dataviewjs
await dv.view("99 System/Scripts/projects", {"status": ["pausiert"], "empty": "Nichts hier."})
```

## Bereiche
```dataviewjs
await dv.view("99 System/Scripts/projects", {"type": "bereich"})
```

## Abgeschlossen
```dataview
TABLE WITHOUT ID file.link AS Projekt, beschreibung AS Worum, ziel AS Ziel
FROM "10 Projekte" OR "90 Archiv"
WHERE type = "projekt" AND status = "abgeschlossen"
SORT file.mtime DESC
```
