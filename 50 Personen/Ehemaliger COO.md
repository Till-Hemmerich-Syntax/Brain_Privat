---
type: person
rolle: Ehemaliger COO, geht zu einem PE-Haus
team: ""
firma: ""
aliases: ["Ex-COO"]
---
```dataviewjs
await dv.view("99 System/Scripts/person-panel")
```

## Wer
- Würde Till als AI Operating Partner mitnehmen, siehe [[Wechsel AI Operating Partner]].

## Offene Punkte
```dataviewjs
await dv.view("99 System/Scripts/waiting", {"forCurrent": true})
```

## Meetings
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"forCurrent": "person", "limit": 20})
```
