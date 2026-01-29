export type GameViewUI = {
    gameContainer: HTMLDivElement;
    konvaMount: HTMLDivElement;
    gameOverContainer: HTMLDivElement;
    playerEl: HTMLSpanElement;
    scoreEl: HTMLSpanElement;
    startButton: HTMLButtonElement;
    pauseButton: HTMLButtonElement;
}

export function renderGameView(container : HTMLElement) {
    container.innerHTML = `
        <div>
          <header>
          </header>
          
          <main class="mx-auto max-w-4xl px-4">
            <div class="max-w-lg mx-auto flex flex-col items-center gap-4">    
                <div class="w-full flex justify-between rounded-xl border p-3">
                    <div>Player: <span id="hud-name"></span></div>  
                    <div>Score: <span id="hud-score">0</span></div>
                </div>
                
                <div id="game-container" class="w-full z-0 aspect-square border relative">
                    <div id="konva-mount" class="absolute inset-0"></div>
                    <div id="game-over-container" class="z-50 absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-4xl font-bold hidden">
                        <div class="flex items-center justify-center text-center">Game Over!</div>
                        <div class="text-base mt-2">Press Restart to start over</div>
                    </div>
                </div>
                <div class="flex justify-center gap-3">
                    <button id="btn-start" class="btn btn-primary">Start</button>
                    <button id="btn-pause" class="btn btn-danger">Pause</button>
                </div>
            </div>
          </main>
        </div>
    `;
    const gameContainer = container.querySelector<HTMLDivElement>("#game-container");
    const scoreEl = container.querySelector<HTMLSpanElement>("#hud-score");
    const startButton = container.querySelector<HTMLButtonElement>("#btn-start");
    const pauseButton = container.querySelector<HTMLButtonElement>("#btn-pause");
    const gameOverContainer = container.querySelector<HTMLDivElement>("#game-over-container");
    const konvaMount = container.querySelector<HTMLDivElement>("#konva-mount");
    const playerEl = container.querySelector<HTMLSpanElement>("#hud-name");

    if (!gameContainer || !scoreEl || !startButton || !pauseButton || !gameOverContainer || !konvaMount || !playerEl) {
        throw new Error("Layout element not found");
    }
    return { gameContainer, scoreEl, startButton, pauseButton, gameOverContainer, konvaMount, playerEl };

}