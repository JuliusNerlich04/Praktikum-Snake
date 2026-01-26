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

export function saveLeaderboard(entries: LeaderboardEntry[]) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}