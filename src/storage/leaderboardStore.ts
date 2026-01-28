export type LeaderboardEntry = {
    name: string;
    score: number;
    dateISO: string
}

export const LEADERBOARD_KEY = "snake_leaderboard_v1";

export function loadLeaderboard(): LeaderboardEntry[] {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if(raw === null) return [];
    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {return []}
    if (!Array.isArray(parsed)) {return [];}
    return parsed as LeaderboardEntry[];
}

export function saveLeaderboard(entries: LeaderboardEntry[]): void {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

function sortLeaderboard(entries: LeaderboardEntry[]): void {
    entries.sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;

        if (a.dateISO < b.dateISO) return 1;
        if (a.dateISO > b.dateISO) return -1;

        return 0;

    });
}

export function addEntry(entries: LeaderboardEntry[], entry: LeaderboardEntry): LeaderboardEntry[] {
    const limit = 10;

    const next = [...entries];
    next.push(entry);

    sortLeaderboard(next);

    const trimmed = next.slice(0, limit);

    return trimmed;
}