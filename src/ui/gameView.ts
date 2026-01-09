import type {LayoutUI} from "./layout";

export type GameViewUI = {
    gameContainer: HTMLDivElement;
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
            <div id="game-container" class="w-full aspect-square max-w-lg mx-auto border"></div>
            
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

    if (!gameContainer || !scoreEl || !startButton || !pauseButton) {
        throw new Error("Layout element not found");
    }
    return { gameContainer, scoreEl, startButton, pauseButton };

}