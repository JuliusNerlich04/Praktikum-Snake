import "./styles/main.css";

import {mountLayout} from "./ui/layout";
import {type GameViewUI, renderGameView} from "./ui/gameView";
import {renderLeaderboardView} from "./ui/leaderboardView";
import {createKonvaRenderer, type KonvaRenderer} from "./game/rendererKonva";
import {getTestState, initGameState, type GameState} from "./game/state";
import {tick} from "./game/engine";
import {attachKeyboardControls} from "./game/input";

type ViewName = "game" | "leaderboard";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("#app not found");

//Layout mounten
const ui = mountLayout(root);

let gameState: GameState | null = null;
let gameInterval: number | null = null;
let isPaused = false;
let isRunning = false;
let renderer: KonvaRenderer<GameState> | null = null;
let detachKeyboard: null | (() => void);

const TICK_MS = 120;

function startLoop() {
    if (gameInterval !== null) return;
    if (!gameState || !renderer) return;

    gameInterval = window.setInterval(() => {
        if (!gameState || !renderer) return;

        gameState = tick(gameState);
        renderer.draw(gameState);
    }, TICK_MS);
}

function stopLoop() {
    if (gameInterval !== null) {
        window.clearInterval(gameInterval);
        gameInterval = null;
    }
}

function startGame(gameUI: GameViewUI) {
    stopLoop();

    gameState = initGameState();

    renderer?.destroy();
    renderer = createKonvaRenderer<GameState>(gameUI.gameContainer);

    renderer.drawGrid(gameState);
    renderer.draw(gameState);

    detachKeyboard = attachKeyboardControls((dir) => {
        if (!gameState) return;
        console.log("onDirection received: " + dir);
        gameState = { ...gameState, pendingDirection: dir };
    });

    isPaused = false;
    isRunning = true;

    startLoop();
    updateControls(gameUI);
}

function pauseGame(gameUI: GameViewUI) {
    if (!isRunning) return;

    stopLoop();
    isPaused = true;
    isRunning = false;

    updateControls(gameUI);
}

function resumeGame(gameUI: GameViewUI) {
    if (!isPaused || !gameState || !renderer) return;

    isPaused = false;
    isRunning = true;

    startLoop();
    updateControls(gameUI);
}

function updateControls(gameUI: GameViewUI) {
    gameUI.startButton.disabled = isRunning;

    gameUI.pauseButton.disabled = !isPaused && !isRunning;
    gameUI.pauseButton.textContent = isPaused ? "Resume" : "Pause";

}
function cleanupCurrentView() {
    stopLoop();

    if (detachKeyboard) {
        detachKeyboard();
        detachKeyboard = null;
    }

    renderer?.destroy();
    renderer = null;

    gameState = null;
    isRunning = false;
    isPaused = false;
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

        updateControls(gameUI);


        gameUI.startButton.addEventListener("click", () =>
            startGame(gameUI)
        );
        gameUI.pauseButton.addEventListener("click", () => {
            if (isRunning) pauseGame(gameUI);
            else resumeGame(gameUI)
        })

        //Konva initialisieren
        renderer = createKonvaRenderer<GameState>(gameUI.gameContainer);
        const state = initGameState();
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


