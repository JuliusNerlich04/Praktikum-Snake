# Praktikumsprojekt Julius
## Snake Spiel
### Spielablauf und Regeln
1. Futter einsammeln

    Trifft der Kopf der Schlange auf ein Futterfeld, wird das Futter gefressen:

   - Die Schlange wächst (um 1 Feld).

   - Du bekommst Punkte (pro Futter ein Punkt).

   - Neues Futter erscheint an einer freien Stelle.

2. Verbotene Bewegungen:
   - Du darfst nicht direkt um 180° drehen (z. B. von links sofort nach rechts), weil du sonst in dich selbst laufen würdest.

3. Game Over (Spielende):
Das Spiel endet, wenn …

   - die Schlange gegen eine Wand stößt, oder

   - die Schlange in ihren eigenen Körper fährt.

4. Gewinnen:

   - es gibt kein "klassisches Gewinnen" - du spielst bis du gewinnst und versuchst ganz oben auf der Bestenliste zu stehen

### Steuerung

- die Schlange bewegt sich ständig weiter
- Richtungsänderungen können durch die Pfeiltasten oder WASD vorgenommen werden

### Starten des Spiels

1. Terminal öffnen
2. Spiel Speichern
3. zum Spiel navigieren
4. Terminal:`npm install`
5. Terminal:`npm run dev`
6. Link öffnen und spielen

### Known Bugs

- während das Spiel pausiert ist, kann die Richtung geändert werden

### Planned Features

- ein Warp-modus, hier soll die Schlange, wenn sie mit der Wand kollidieren würde,
auf der gegenüber liegenden Seite in das Spielfeld laufen
- Bestenliste reset feature oder Unterauswahl in tages-/ monatsaktuell und Gesamt
 