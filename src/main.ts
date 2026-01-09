import "./styles/main.css";

import {mountLayout} from "./ui/layout";
import {renderGameView} from "./ui/gameView";
import {renderLeaderboardView} from "./ui/leaderboardView";
import {createKonvaRenderer, type KonvaRenderer} from "./game/rendererKonva";
import {getTestState, initGameState, type GameState} from "./game/state";
import {tick} from "./game/engine";

type ViewName = "game" | "leaderboard";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("#app not found");

//Layout mounten
const ui = mountLayout(root);

let gameState: GameState | null = null;
let gameInterval: number | null = null;
let renderer: KonvaRenderer<GameState> | null = null;

function cleanupCurrentView() {
    if (gameInterval !== null) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    renderer?.destroy();
    renderer = null;
    gameState = null;
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
        gameUI.startButton.addEventListener("click", () => {
            if (gameInterval !== null) return;

            gameState = initGameState();

            renderer = createKonvaRenderer<GameState>(gameUI.gameContainer);
            renderer.drawGrid(gameState);
            renderer.draw(gameState);

            gameInterval = window.setInterval(() => {
                if (!gameState || !renderer) return;

                gameState = tick(gameState);
                renderer.draw(gameState);
            }, 150)
        })

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


