---
type: system
---
# Regeln für Claude

Dieser Vault ist Tills **privates Gehirn**: Training, Eni, Nebenprojekte, Gründung, Karriere, Finanzen, Gaming. Vertrauliche Firmeninhalte (Zahlen, Personalthemen, Transkripte) haben hier nichts verloren. Ihr Platz ist der Vault `Arbeit`.

Till arbeitet fast nie selbst in diesem Vault. **Claude pflegt alles**, Till liest Dashboards und hakt Todos ab. Daraus folgt: Struktur und Formate unten sind verbindlich, sonst brechen die Dashboards.

## Arbeitsweise mit Git

- Vor jedem Schreiben `git pull --rebase`. Nach dem Schreiben committen und pushen.
- Commit-Nachrichten: `claude: <was>` (z. B. `claude: Meeting 2026-11-14 Sprint-Review importiert`).
- Till committet über das Plugin Obsidian Git automatisch alle 5 Minuten (`till: auto …`). Bei Konflikten in einer Todo-Zeile gewinnt immer Tills Version (Häkchen).
- Niemals Dateien löschen. Nicht mehr Relevantes wandert nach `90 Archiv/` (Status `abgeschlossen` setzen).
- `.obsidian/` nur ändern, wenn Till es ausdrücklich will.

## Ordner

| Ordner | Inhalt |
| --- | --- |
| `00 Inbox` | Unsortiertes. Claude räumt die Inbox beim Wochenreview leer. |
| `10 Projekte` | Vorhaben mit Ziel und Ende. Eine Notiz pro Projekt. |
| `20 Bereiche` | Dauerhafte Verantwortung ohne Ende. |
| `30 Wissen` | Fakten, Glossar, Hintergründe, Nachschlagewerk. |
| `40 Meetings` | Eine Notiz pro Meeting, Unterordner `JJJJ-MM`. |
| `50 Personen` | Eine Notiz pro Person. Dateiname = voller Name, wie Till ihn nutzt. |
| `60 Journal` | `Wochen/JJJJ-KWnn.md` für Wochenreviews, `Tage/` optional. |
| `90 Archiv` | Abgeschlossenes. |
| `99 System` | Dashboards, Vorlagen, Scripts. Nur auf Anweisung ändern. |

## Frontmatter

Projekt (`type: projekt`): `status` (aktiv, geplant, idee, pausiert, prüfen, abgeschlossen), `prio` (hoch, mittel, niedrig), `icon` (ein Emoji), `bereich` (Link), `start`, `ziel` (Datum JJJJ-MM-TT), `beschreibung` (ein Satz, max. 120 Zeichen), `aliases`.
Status `prüfen` heißt: Claude kennt den aktuellen Stand nicht. Beim nächsten passenden Hinweis aktualisieren.

Bereich (`type: bereich`): `icon`, `beschreibung`, `aliases`.

Person (`type: person`): `rolle`, `team`, `firma`, `aliases`. Inhalt nur beruflicher bzw. für Till relevanter Kontext. Keine Gesundheitsdaten, keine Personalakten-Inhalte, keine Gerüchte.

Meeting (`type: meeting`): `datum`, `start` ("HH:MM"), `titel`, `kurz` (ein Satz für die Timeline), `projekte` (Liste von Links), `personen` (Liste von Links), `wispr` (Share-Link), `wispr_id`.

Links in Listen immer in Anführungszeichen: `projekte: ["[[BfM Studio]]", "[[FlexDelivery]]"]`.

## Todos

Todos stehen dort, wo sie entstanden sind (Meeting- oder Projektnotiz). Die Dashboards sammeln sie automatisch ein. Format (Tasks-Plugin), Reihenfolge einhalten, so schreibt sie auch das Plugin selbst:

```
- [ ] Beschreibung mit Verb [[Projekt]] [[Person]] #tag 🔺 ➕ 2026-11-13 📅 2026-11-20
```

- **Meine Todos**: kein Tag. Immer das Projekt verlinken, wenn es eines gibt.
- **Warten auf**: Tag `#warten` und die Person verlinken, die liefern muss. Text beginnt mit dem, was geliefert wird.
- **Zu prüfen**: Tag `#prüfen` für Todos, bei denen unklar ist, ob sie noch offen sind.
- `📅` nur bei echter Frist. Relative Angaben ("Ende nächster Woche") vom Meetingdatum aus in ein Datum umrechnen.
- `➕` immer mit dem Entstehungsdatum.
- Priorität sparsam: `🔺` nur, wenn etwas brennt, `⏫` wenn es wichtig und dringend ist.
- Erledigte Todos niemals wieder öffnen, nie Tills Häkchen ändern.
- Gleiches Todo nicht doppelt anlegen. Wenn ein Folgemeeting ein Todo bestätigt oder verschiebt, das bestehende anpassen.

## Wochenreview (freitags)

Datei `60 Journal/Wochen/JJJJ-KWnn.md` nach Vorlage. Inhalt: Was passiert ist (5 bis 8 Punkte mit Links), was erledigt wurde, was hängt (überfällig, lange wartend, Projekte ohne Bewegung seit 3 Wochen), Fokus für nächste Woche. Danach Inbox leeren und Projekt-Status aktualisieren.

## Dateinamen

- Umlaute in Dateinamen immer in Unicode-NFC schreiben. macOS legt sonst eine zweite Schreibweise an, und Git sieht doppelte Dateien.
- Keine Zeichen `: / \\ ? * " < > |` in Dateinamen.

## Sprache und Stil

- Deutsch, knapp, konkret. Keine Marketing-Sprache.
- Keine Gedankenstriche als Satzzeichen.
- Doppelpunkt-Konstruktionen im Fließtext vermeiden.
- Die Konstruktion "nicht X, sondern Y" vermeiden.
- Fakten mit Datum versehen, wenn sie sich ändern können ("Stand 11/2026").
- Unsicheres als solches markieren statt raten.
