import {loadLeaderboard, type LeaderboardEntry} from "../storage/leaderboardStore";


export function renderLeaderboardView(container : HTMLElement) {
    const entries: LeaderboardEntry[] = loadLeaderboard();
    container.innerHTML = ""
    if (entries.length === 0) {
        const p = document.createElement("p");
        p.textContent = 'noch keine Einträge'
        container.appendChild(p);
        return;
    }
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const thRow = document.createElement("tr");
    const thRang = document.createElement("th");
    thRang.textContent = 'Rang'
    const thName = document.createElement("th");
    thName.textContent = 'Name'
    const thScore = document.createElement("th");
    thScore.textContent = 'Score'
    const thDatum = document.createElement("th");
    thDatum.textContent = 'Datum'

    wrapper.classList.add("max-w-lg", "mx-auto", "px-4");
    table.classList.add("w-full", "border-collapse")
    thRow.classList.add("border-b")
    thRang.classList.add("p-2", "text-left", "font-semibold");
    thName.classList.add("p-2", "text-left", "font-semibold");
    thScore.classList.add("p-2", "text-left", "font-semibold");
    thDatum.classList.add("p-2", "text-left", "font-semibold");

    thRow.append(thRang);
    thRow.append(thName);
    thRow.append(thScore);
    thRow.append(thDatum);
    thead.append(thRow);

    table.append(thead);

    const tbody = document.createElement("tbody");
    for (let i = 0, len = entries.length; i < len; i++) {
        const entry = entries[i];
        const trRow = document.createElement("tr");
        const tdRang = document.createElement("td");
        tdRang.textContent = (i + 1).toString();
        const tdName = document.createElement("td");
        tdName.textContent = entry.name;
        const tdScore = document.createElement("td");
        tdScore.textContent = entry.score.toString();
        const tdDatum = document.createElement("td");
        tdDatum.textContent = new Date(entry.dateISO).toLocaleString("de-DE");

        tdRang.classList.add("p-2", "border-b");
        tdName.classList.add("p-2", "border-b");
        tdScore.classList.add("p-2", "border-b");
        tdDatum.classList.add("p-2", "border-b");

        trRow.append(tdRang, tdName, tdScore, tdDatum);
        tbody.append(trRow);
    }
    table.append(tbody);
    wrapper.append(table);
    container.append(wrapper);
}