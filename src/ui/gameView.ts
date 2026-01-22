export type GameViewUI = {
    gameContainer: HTMLDivElement;
    konvaMount: HTMLDivElement;
    gameOverContainer: HTMLDivElement;
    scoreEl: HTMLSpanElement;
    startButton: HTMLButtonElement;
    pauseButton: HTMLButtonElement;
}

export function renderGameView(container : HTMLElement) {
    container.innerHTML = `
        <div>
          <header>
          </header>
          
          <main>
            
            <div id="game-container" class="z-0 aspect-square max-w-lg mx-auto border relative">
                <div id="konva-mount" class="absolute inset-0"></div>
                <div id="game-over-container" class="z-50 absolute inset-0 flex flex-col items-center justify-center bg-red/60 text-white text-4xl font-bold hidden">
                    <div class="flex items-center justify-center text-center">Game Over!</div>
                    <div class="text-base mt-2">Press Restart to start over</div>
                </div>
            </div>
            <aside>
              <div>Score: <span id="hud-score">0</span></div>
              <button id="btn-start">Start</button>
              <button id="btn-pause">Start</button>
            </aside>
          </main>
        </div>
    `;
    const gameContainer = container.querySelector<HTMLDivElement>("#game-container");
    const scoreEl = container.querySelector<HTMLSpanElement>("#hud-score");
    const startButton = container.querySelector<HTMLButtonElement>("#btn-start");
    const pauseButton = container.querySelector<HTMLButtonElement>("#btn-pause");
    const gameOverContainer = container.querySelector<HTMLDivElement>("#game-over-container");
    const konvaMount = container.querySelector<HTMLDivElement>("#konva-mount");

    if (!gameContainer || !scoreEl || !startButton || !pauseButton || !gameOverContainer || !konvaMount) {
        throw new Error("Layout element not found");
    }
    return { gameContainer, scoreEl, startButton, pauseButton, gameOverContainer, konvaMount };

}