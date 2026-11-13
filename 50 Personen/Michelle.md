---
type: person
rolle: Leserin von Enis Logbuch
team: ""
firma: Berlin
aliases: ["Michelle Berlin"]
---
```dataviewjs
await dv.view("99 System/Scripts/person-panel")
```

## Wer
- Wohnt in Berlin, rund 600 km entfernt.
- Bekommt regelmäßig das Logbuch aus Enis Sicht per WhatsApp.

## Offene Punkte
```dataviewjs
await dv.view("99 System/Scripts/waiting", {"forCurrent": true})
```

## Meetings
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"forCurrent": "person", "limit": 20})
```
