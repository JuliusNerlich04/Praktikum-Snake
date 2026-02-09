# Praktikumsprojekt Julius – Snake SPA

Ein Single-Page-Application (SPA) Snake-Spiel. Ziel ist es, möglichst viele Punkte zu sammeln und in der Bestenliste oben zu stehen.

---

## Demo
- Live-Demo: _tbd_
- Screenshots/GIF: _tbd_

---

## Features
- Klassisches Snake-Gameplay (Wachstum, Punkte)
- Kontinuierliche Bewegung der Schlange
- Steuerung über Pfeiltasten oder WASD
- Bestenliste (je nach Implementierung)

---

## Spielablauf und Regeln

1. **Futter einsammeln**  
   Trifft der Kopf der Schlange auf ein Futterfeld, wird das Futter gefressen:
    - Die Schlange wächst (um **1 Feld**).
    - Du bekommst Punkte (pro Futter **1 Punkt**).
    - Neues Futter erscheint an einer **freien** Stelle.

2. **Verbotene Bewegungen**
    - Du darfst nicht direkt um **180°** drehen (z. B. von links sofort nach rechts), weil du sonst in dich selbst laufen würdest.

3. **Game Over (Spielende)**  
   Das Spiel endet, wenn …
    - die Schlange gegen eine **Wand** stößt, oder
    - die Schlange in ihren **eigenen Körper** fährt.

4. **Gewinnen**
    - Es gibt kein „klassisches Gewinnen“ – du spielst so lange wie möglich und versuchst, ganz oben auf der Bestenliste zu stehen.

---

## Controls

| Aktion                | Tastatur           |
|-----------------------|--------------------|
| Richtung ändern       | Pfeiltasten / WASD |
| Pause/Resume | Leertaste          |
| Start/Restart         | Enter              |

> Hinweis: Die Schlange bewegt sich ständig weiter; Eingaben ändern nur die Richtung.

---

## Tech Stack
- TypeScript, Vite
- Konva
- Tailwind

---

## Getting Started

### Voraussetzungen
- Node.js
- npm

### Installation
```bash
# Repository lokal speichern
git clone https://github.com/JuliusNerlich04/Praktikum-Snake
cd <repo>

npm install
npm run dev

### Run with Docker Container

- `docker build -t snake .`
- `docker run --network host --name snake -p 5173:5173 snake`
