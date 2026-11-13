---
type: bereich
icon: 🐕
beschreibung: Foxred Labradorhündin Eni und ihr Logbuch für Michelle.
aliases: ["Hund", "Labrador", "Eni Tagebuch", "Logbuch"]
---
## Eni
- Foxred Labrador, Hündin. Sorgerecht geteilt, Eni ist zeitweise bei der anderen Person.
- Tills bester Freund ist Enis Patenonkel.

## Logbuch
- Humorvolles Tagebuch aus Enis Sicht ("Logbuch", "Kneipen-Tagebuch") für [[Michelle]] in Berlin, Versand per WhatsApp.
- Till heißt darin "die Nacktnase" oder "der Alte".

## Projekte in diesem Bereich
```dataview
TABLE WITHOUT ID file.link AS Projekt, status AS Status, beschreibung AS Worum
FROM "10 Projekte"
WHERE contains(string(bereich), this.file.name)
SORT status ASC
```
