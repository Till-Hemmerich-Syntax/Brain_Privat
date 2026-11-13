---
type: projekt
status: aktiv
prio: mittel
icon: 🎮
bereich: "[[Gaming]]"
start: 2026-10-28
ziel:
beschreibung: Eigener Path-of-Exile-1-Aurabot in Rust, ersetzt DreamPoeBot. Ziel ist Tag 1 der neuen League.
aliases: ["poe-aurabot", "PoE Bot", "DreamPoeBot Clone", "POE"]
---
```dataviewjs
await dv.view("99 System/Scripts/project-panel")
```

> [!kontext] Worum geht es
> Eigener Bot, um nicht mehr vom Entwickler von DreamPoeBot abhängig zu sein. Offsets kommen aus eigenem Tooling (REA).
> Hauptziel ist ein Aurabot, der in Maps Auren, Buffs und Links hält, überlebt, revived und Map-Logistik übernimmt.

## Stand
- Repo `C:\dev\poe-aurabot` auf dem Windows-PC, nur lokales Git. Phase 1 läuft.
- Summon-Modus und Quests sind aus Phase 1 raus. Kampagne spielt Till zum League-Start von Hand.
- Following über den Teleport-Button am Party-Portrait. Portal-"Tanzen" an Übergängen seit 11.11. behoben.
- Bot-Client läuft auf einem gemieteten Cloud-PC, Patch-Analyse auf dem Dev-PC. Leader spielt Till per GeForce NOW.
- Charakter ReynSlayer ist jetzt der Aurabot (Duelist), Link-Skills mit The Hand of Phrecia.

## Entscheidungen
- 10/2026 · Rust. Nur Till nutzt das Tool, Neukompilieren ist okay.
- 11/2026 · Zwei-PC-Setup mit gemietetem Cloud-PC für den Bot-Client.
- 11/2026 · Leader-Wechsel ohne Neustart, Gems automatisch über den Level-all-Button.

## Offene Fragen
- Eigenes In-Game-Hooking für Input?

## Todos
```dataviewjs
await dv.view("99 System/Scripts/project-tasks")
```

## Anforderungen
- Stirbt der Leader, öffnet der Bot per Hotkey ein Portal und bleibt in der Zone. Stirbt der Bot, resurrected er und kehrt zurück.
- Link zum Leader darf nie abreißen.
- Steuerung über Kontrollfenster und Hotkeys, Debug-Overlay früh.
- Moonshot-Liste (zero-touch patches, flight recorder, human-like following u. v. m.) liegt in `moonshot.md` im Repo.

## Meetings
```dataviewjs
await dv.view("99 System/Scripts/meetings", {"forCurrent": "projekt", "limit": 20})
```
