import "./styles/main.css";

import {mountLayout} from "./ui/layout";
import {type GameViewUI, renderGameView} from "./ui/gameView";
import {renderLeaderboardView} from "./ui/leaderboardView";
import {createKonvaRenderer, type KonvaRenderer} from "./game/rendererKonva";
import {initGameState, type GameState} from "./game/state";
import {tick} from "./game/engine";
import {attachKeyboardControls} from "./game/input";
import {DEFAULT_OPTIONS, openNameModal, type OpenNameModalOptions} from "./ui/nameModal";
import {addEntry, type LeaderboardEntry, loadLeaderboard, saveLeaderboard} from "./storage/leaderboardStore";
import {attachGameHotkeys} from "./game/hotkeys";

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
let currentGameUI: GameViewUI | null = null;
let playerName: string | null = null;
let detachHotkeys: null | (() => void) = null;

const TICK_MS = 150;

async function handleStartClick(gameUI: GameViewUI) {
    if (playerName === null) {
        const result = await openNameModal({ maxLen: 16, title: "User Name: "});
        if (result === null) {
            return
        } else {
            playerName = result;
        }
    }
    startGame(gameUI);
}

async function handleNameClick(gameUI: GameViewUI) {
    const wasRunning = isRunning;
    const wasGameOver = gameState?.isGameOver
    if (wasRunning && !wasGameOver) {
        pauseGame(gameUI);
        updateControls(gameUI);
    }
    const result = await openNameModal({ maxLen: 16, title: "User Name: ", initialValue: playerName ?? ""});
    if (result !== null) {
        playerName = result;
        updateControls(gameUI);
    }

    if (wasRunning && !wasGameOver) {
        resumeGame(gameUI);
    }

}

function startLoop() {
    console.log("Starting Loop, interval" + TICK_MS + "has State" + gameState + "hasRenderer" + renderer);

    if (gameInterval !== null) return;

    if (!gameState || !renderer) return;


    gameInterval = window.setInterval(() => {
        if (!gameState || !renderer) return;

        gameState = tick(gameState);
        console.log("tick happened");
        if (gameState.isGameOver) {
            console.log("isGameOver");
            stopLoop();
            if (detachKeyboard) {
                detachKeyboard();
                detachKeyboard = null;
            }

            const entry: LeaderboardEntry = {name: playerName ?? "Unknown",
                score: gameState.score,
                dateISO: new Date().toISOString()}
            const leaderboard = loadLeaderboard();
            const next = addEntry(leaderboard, entry);
            saveLeaderboard(next);

            isRunning = false;
            isPaused = false;
            if (currentGameUI) updateControls(currentGameUI);

            return;
        }
        renderer.draw(gameState);

        if (currentGameUI) updateControls(currentGameUI);
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

    if (isRunning) return;

    if (detachKeyboard) {
        detachKeyboard();
        detachKeyboard = null;
    }

    gameState = initGameState();

    renderer?.destroy();
    renderer = createKonvaRenderer<GameState>(gameUI.konvaMount);

    renderer.drawGrid(gameState);
    renderer.draw(gameState);

    detachKeyboard = attachKeyboardControls((dir) => {
        if (!gameState) return;
        gameState.pendingDirections = gameState.pendingDirections ?? [];
        gameState.pendingDirections.push(dir);
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
    if (gameState?.isGameOver === true) {
        gameUI.pauseButton.classList.add("hidden");
        gameUI.startButton.textContent = "Restart";
        gameUI.startButton.disabled = false;
        gameUI.gameOverContainer.classList.remove("hidden");
    } else {
        gameUI.pauseButton.classList.remove("hidden");
        gameUI.gameOverContainer.classList.add("hidden");
        gameUI.startButton.textContent = "Start";
        gameUI.startButton.disabled = isRunning;
        gameUI.pauseButton.textContent = isPaused ? "Resume" : "Pause";
    }

    const score = gameState?.score ?? 0;
    gameUI.scoreEl.textContent = String(score);
    gameUI.playerEl.textContent = playerName ?? "-";

}
function cleanupCurrentView() {
    stopLoop();

    currentGameUI = null;

    if (detachKeyboard) {
        detachKeyboard();
        detachKeyboard = null;
    }

    if (detachHotkeys) {
        detachHotkeys();
        detachHotkeys = null;
    }

    renderer?.destroy();
    renderer = null;

    gameState = null;
    isRunning = false;
    isPaused = false;

    currentGameUI = null;
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
        currentGameUI = gameUI;

        gameUI.playerEl.addEventListener("click", () => {
            void handleNameClick(gameUI)
        })

        detachHotkeys = attachGameHotkeys({
            isModalOpen: () => document.querySelector('[dada-modal="name"]') !== null,
            isRunning: () => isRunning,
            isPaused: () => isPaused,
            isGameOver: () => gameState?.isGameOver === true,

            onTogglePause: () => {
                if(isRunning) pauseGame(gameUI);
                else if (isPaused) resumeGame(gameUI);
            },

            onStartOrRestart: () => {
                void handleStartClick(gameUI);
            }
        });


        gameState = initGameState();

        renderer?.destroy();
        renderer = createKonvaRenderer<GameState>(gameUI.konvaMount);
        renderer.drawGrid(gameState);
        renderer.draw(gameState);

        gameUI.startButton.addEventListener("click", () => {
            void handleStartClick(gameUI);
        });
        gameUI.pauseButton.addEventListener("click", () => {
            if (isRunning) pauseGame(gameUI);
            else resumeGame(gameUI)
        })

        updateControls(gameUI);

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


