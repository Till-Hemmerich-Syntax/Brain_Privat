---
type: bereich
icon: 🎮
beschreibung: Path of Exile 1 und eigene Bot-Projekte.
aliases: ["Path of Exile", "PoE"]
---
## Setup
- PoE 1 auf einem separaten Windows-PC (GTX 970), Leader auch per GeForce NOW.
- Eigenes Projekt [[PoE Aurabot]].

## Projekte in diesem Bereich
```dataview
TABLE WITHOUT ID file.link AS Projekt, status AS Status, beschreibung AS Worum
FROM "10 Projekte"
WHERE contains(string(bereich), this.file.name)
SORT status ASC
```
