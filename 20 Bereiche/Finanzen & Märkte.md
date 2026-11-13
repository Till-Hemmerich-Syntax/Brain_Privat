---
type: bereich
icon: 📈
beschreibung: Lern-Hobby rund um Finanzmärkte und Derivate.
aliases: ["Finanzmärkte", "Trading", "Börse"]
---
## Gelernt
- Knock-out-Zertifikate (Turbos) bei Trade Republic per Monte-Carlo-Simulation (200.000 Pfade) getestet. Weder hoher noch niedriger Hebel erreicht unrealistische Ziele.
- Fit Group AG IPO (Wiener Börse, Freiverkehr) skeptisch bewertet, Micro-Cap-Risiko.
- Interesse an VSOP und Equity-Modellen im deutschen EdTech-Umfeld.

## Projekte in diesem Bereich
```dataview
TABLE WITHOUT ID file.link AS Projekt, status AS Status, beschreibung AS Worum
FROM "10 Projekte"
WHERE contains(string(bereich), this.file.name)
SORT status ASC
```
