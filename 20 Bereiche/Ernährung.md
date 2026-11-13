---
type: bereich
icon: 🥗
beschreibung: Vegetarisch, kocht selbst, Fokus auf Protein.
aliases: ["Essen", "Diät"]
---
## Grundsätze
- Vegetarisch, kocht selbst.
- Protein vor allem aus Shakes, Skyr, Magerquark, Eiern, Tofu.

## Projekte in diesem Bereich
```dataview
TABLE WITHOUT ID file.link AS Projekt, status AS Status, beschreibung AS Worum
FROM "10 Projekte"
WHERE contains(string(bereich), this.file.name)
SORT status ASC
```
