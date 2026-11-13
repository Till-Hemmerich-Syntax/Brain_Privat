---
type: projekt
status: aktiv
prio: hoch
icon: 🚒
bereich: "[[Gründung & Nebengewerbe]]"
start: 2026-09-05
ziel:
beschreibung: Material-, Bekleidungs- und Prüfsystem für die drei Freiwilligen Feuerwehren in Flörsheim. Pilotkunde.
aliases: ["Feuerwehr-Projekt", "Kleiderkammer-Tool", "Flörsheim", "Feuerwehr Inv Tool"]
---
```dataviewjs
await dv.view("99 System/Scripts/project-panel")
```

> [!kontext] Worum geht es
> Anfrage über einen Kumpel. Drei Freiwillige Feuerwehren in Flörsheim, Zentrallager bei der FF Flörsheim, die anderen Wehren haben eigene Kleiderwarte und Wehrführer, aber kein Lager.
> Neben der Kleiderkammer betreut die Feuerwehr städtische Prüfobjekte (Verbandskästen, AEDs, Leitern). Das System soll alles abdecken.

## Stand
- MVP-Start 20.10.2026, Demo am 21.10. bei Stabsstelle und Wehrführern kam sehr gut an.
- Ticket-System ist das Grundgerüst, mit wiederkehrenden Prüfungen, Mängeln, Ablaufdaten und manuellen Meldungen.
- Benachrichtigungen per E-Mail und Push. Rollen werden gemeinsam über User-Stories definiert.
- Kostenloser Pilot mit der FF Flörsheim, Testbetrieb mit allen drei Wehren gleichzeitig.

## Entscheidungen
- 10/2026 · Stack Next.js und Supabase, für die Demo lokal via Docker. Build mit Claude Code (SPEC mit Phasen).
- 10/2026 · Till hostet selbst, die Stadt ist Kunde.
- 21.10. · Ticket-System als Grundgerüst, Benachrichtigungen per Mail und Push.

## Offene Fragen
- Nebengewerbe anmelden, bevor es kostenpflichtig wird.
- Später an weitere Feuerwehren vermarkten?

## Todos
```dataviewjs
await dv.view("99 System/Scripts/project-tasks")
```

## Meetings
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"forCurrent": "projekt", "limit": 20})
```
