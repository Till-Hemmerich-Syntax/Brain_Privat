---
type: bereich
icon: 💡
beschreibung: Plan, in den nächsten Jahren nebenberuflich ein bootstrapped Business aufzubauen.
aliases: ["Startup", "Gründung", "Bootstrapping", "Nebengewerbe"]
---
## Rahmen
- Bootstrapped, nebenberuflich starten, in 12 bis 24 Monaten aus dem Job aussteigen.
- Ausdrücklich kein BGS-Geschäft. Domäne und Modell offen (SaaS, produktisierte Dienstleistung).
- Gesucht sind marktvalidierte Ideen statt Brainstorming.

## Ideen in Reihenfolge (Stand 29.08.2026)
1. Bezahlte Moodle-Plugins über den neuen Moodle Marketplace (Zertifikate, Reporting)
2. Ausbilder-Cockpit für den Mittelstand nach Abschaltung des IHK-Berichtshefts zum 31.12.2026
3. Produkte für Bildungsanbieter
4. EU AI Act Art. 50 Kennzeichnung als kurzfristiger Cash-Motor

Verworfen: KI-Automatisierungsagentur, n8n-Templates und Hosting, KI-Compliance für KMU, LMS bzw. Skills-Management für KMU.

## Risiko
- IP-Zuordnung nach § 69b UrhG und Nebentätigkeit bzw. Treuepflicht gegenüber dem Arbeitgeber, weil mehrere Ideen nah am Job liegen. Vor dem ersten bezahlten Auftrag klären.

## Konkret
- [[Feuerwehr Bestandssystem]] als erster Kunde, soll die Produktentwicklung finanzieren.
- [[openDesk-Partner]] als zweite Option.

## Projekte in diesem Bereich
```dataview
TABLE WITHOUT ID file.link AS Projekt, status AS Status, beschreibung AS Worum
FROM "10 Projekte"
WHERE contains(string(bereich), this.file.name)
SORT status ASC
```
