export type LayoutUI = {
    viewRoot: HTMLDivElement;
    navGame: HTMLButtonElement;
    navLeaderboard: HTMLButtonElement;
}
export function mountLayout(root: HTMLElement): LayoutUI {
    root.innerHTML = `
        <div>
            <div class="max-w-4xl mx-auto px-4">
              <header class="flex flex-col items-center gap-4 py-4">
                <h1 class="text-5xl text-emerald-500 font-extrabold tracking-tight">Snake</h1>
                <nav class="flex gap-2">
                    <button id="nav-game" class="btn btn-primary ">Spiel</button>
                    <button id="nav-leaderboard" class="btn btn-secondary">Bestenliste</button>
                </nav>
              </header>
            </div>
          <main>
            <div id="view-root"></div>
          </main>
        </div>
    `;
    const viewRoot = root.querySelector<HTMLDivElement>("#view-root");
    const navGame = root.querySelector<HTMLButtonElement>("#nav-game");
    const navLeaderboard = root.querySelector<HTMLButtonElement>("#nav-leaderboard");

    if (!navGame || !navLeaderboard || !viewRoot) {
        throw new Error("Layout element not found");
    }

    return { navGame, navLeaderboard, viewRoot };
}