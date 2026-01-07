import "./styles/main.css";

import {mountLayout} from "./ui/layout";
import {renderGameView} from "./ui/gameView";
import {renderLeaderboardView} from "./ui/leaderboardView";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("#app not found");

//Layout mounten
const ui = mountLayout(root);

//zentrale View-Wechselfunktion
function showView(view: "game" | "leaderboard") {
    ui.viewRoot.innerHTML = ``;

    if (view === "game") {
        renderGameView(ui.viewRoot);
    }

    if (view === "leaderboard") {
        renderLeaderboardView(ui.viewRoot);
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


