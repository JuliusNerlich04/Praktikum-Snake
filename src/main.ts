import "./styles/main.css";

import {mountLayout} from "./ui/layout";
import {renderGameView} from "./ui/gameView";
import {renderLeaderboardView} from "./ui/leaderboardView";
import {createKonvaRenderer, type KonvaRenderer, type RenderState} from "./game/rendererKonva";

type ViewName = "game" | "leaderboard";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("#app not found");

//Layout mounten
const ui = mountLayout(root);

let renderer: KonvaRenderer<RenderState> | null = null;

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
        renderer = createKonvaRenderer<RenderState>(gameUI.gameContainer);
        renderer.draw({ gridSize: 20 });

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


