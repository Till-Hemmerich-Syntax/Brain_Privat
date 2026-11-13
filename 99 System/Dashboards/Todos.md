---
cssclasses:
  - brain-dash
---
# Todos

```dataviewjs
await dv.view("99 System/Scripts/stats")
```

## Überfällig & heute
```tasks
not done
due before tomorrow
tags do not include #warten
tags do not include #prüfen
sort by due
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

## Nächste 7 Tage
```tasks
not done
due after today
due before in 8 days
tags do not include #warten
tags do not include #prüfen
sort by due
group by due
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

## Später
```tasks
not done
due after in 7 days
tags do not include #warten
tags do not include #prüfen
sort by due
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

## Ohne Datum
```tasks
not done
no due date
tags do not include #warten
tags do not include #prüfen
group by filename
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

## Warten auf andere
```tasks
not done
tags include #warten
group by filename
sort by due
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

## Zu prüfen
> [!info] Was ist das?
> Todos aus Meetings, bevor dieses System lief. Claude weiß nicht, ob sie erledigt sind. Abhaken, wenn erledigt, oder Claude sagen, dass es sie wieder aufnehmen soll.

```tasks
not done
tags include #prüfen
group by filename
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

## Erledigt in den letzten 7 Tagen
```tasks
done after 7 days ago
sort by done reverse
path does not include 99 System
path does not include 90 Archiv
short mode
hide task count
```

