import "./styles/main.css";

import {mountLayout} from "./ui/layout";
import {renderGameView} from "./ui/gameView";
import {renderLeaderboardView} from "./ui/leaderboardView";
import {createKonvaRenderer, type KonvaRenderer} from "./game/rendererKonva";
import {getTestState, type GameState} from "./game/state";

type ViewName = "game" | "leaderboard";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("#app not found");

//Layout mounten
const ui = mountLayout(root);

let renderer: KonvaRenderer<GameState> | null = null;

function cleanupCurrentView() {
    if (renderer) {
        renderer.destroy();
        renderer = null;
    }
}

//zentrale View-Wechselfunktion
function showView(view: ViewName) {
    //Aufräumen der vorherigen Stages
    cleanupCurrentView();

    //View Root leeren
    ui.viewRoot.innerHTML = ``;

    //Neue View rendern
    if (view === "game") {
        const gameUI = renderGameView(ui.viewRoot);

        //Konva initialisieren
        renderer = createKonvaRenderer<GameState>(gameUI.gameContainer);
        const state = getTestState();
        renderer.drawGrid(state);
        renderer.draw(state);

        return;
    }

    if (view === "leaderboard") {
        renderLeaderboardView(ui.viewRoot);
        return;
    }
}

// Event listener für Navigation
ui.navGame.addEventListener("click", () => {
    showView("game");
});
ui.navLeaderboard.addEventListener("click", () => {
    showView("leaderboard");
});

//Startpunkt
showView("game");


