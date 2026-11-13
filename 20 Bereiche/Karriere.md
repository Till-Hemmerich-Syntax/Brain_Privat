---
type: bereich
icon: 💼
beschreibung: Berufliche Entwicklung und Optionen außerhalb des aktuellen Jobs.
aliases: ["Job", "Laufbahn"]
---
## Heute
- AI Officer bei Syntax bzw. Bildung für Morgen, vorher Teamlead Kurse. Details im Arbeits-Vault.

## Optionen
- [[Wechsel AI Operating Partner]]
- Eigene Gründung, siehe [[Gründung & Nebengewerbe]]

## Projekte in diesem Bereich
```dataview
TABLE WITHOUT ID file.link AS Projekt, status AS Status, beschreibung AS Worum
FROM "10 Projekte"
WHERE contains(string(bereich), this.file.name)
SORT status ASC
```
