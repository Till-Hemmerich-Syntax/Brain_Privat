---
type: projekt
status: prüfen
prio: niedrig
icon: 🏊
bereich: "[[Training & Triathlon]]"
start:
ziel:
beschreibung: Web-App bzw. PWA, die Strava- und Garmin-Daten mit einem KI-Coaching-Layer verbindet.
aliases: ["TriCoach"]
---
```dataviewjs
await dv.view("99 System/Scripts/project-panel")
```

> [!kontext] Worum geht es
> Trainingsplan gegen Strava- und Garmin-Daten, KI-Coaching über die Claude API, readiness-aware Anpassung.

## Stand
- PRD mit Garmin-Vitaldaten (HRV, Schlaf, Body Battery) und Strava-API-Terms-Toggle.
- Strava-zu-Garmin-FIT-Import-Tool gebaut, Garmin-Rate-Limits gelöst.
- Aktueller Stand unklar.

## Todos
```dataviewjs
await dv.view("99 System/Scripts/project-tasks")
```

## Meetings
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"forCurrent": "projekt", "limit": 20})
```
