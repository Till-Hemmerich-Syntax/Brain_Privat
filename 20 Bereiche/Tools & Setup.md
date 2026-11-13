---
type: bereich
icon: 🛠️
beschreibung: Persönliche Tools, Geräte und Side-Apps.
aliases: ["Setup", "Geräte"]
---
## Geräte
- Laptop für Arbeit und Privat (einziges Gerät im Alltag).
- Altes M2 MacBook Pro (16 GB) als künftiger Homeserver.
- Windows-PC für Gaming und Bot-Entwicklung.

## Arbeitsweise
- Baut viel mit Claude Code, gern über Nacht im Nachtschicht-Format.
- Stack für eigene Web-Apps meist Next.js und Supabase.

## Projekte in diesem Bereich
```dataview
TABLE WITHOUT ID file.link AS Projekt, status AS Status, beschreibung AS Worum
FROM "10 Projekte"
WHERE contains(string(bereich), this.file.name)
SORT status ASC
```
