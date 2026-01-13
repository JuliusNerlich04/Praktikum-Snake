
export type Point = { x: number; y: number };

export type Direction = "up" | "down" | "left" | "right" ;

export type GameState = {
    gridSize: number;
    snake: Point[];
    direction: Direction;
    pendingDirection?: Direction;
    food: Point;
};

export function getTestState(): GameState {
    return {
        gridSize: 20,
        snake: [
            {x: 4, y: 5},
            {x: 3, y: 5},
            {x: 2, y: 5}
        ],
        direction: "right",
        food: {x: 5, y: 5},
    }
}

export function initGameState(): GameState {
    return {
        gridSize: 20,
        snake: [
            {x: 4, y: 5},
            {x: 3, y: 5},
            {x: 2, y: 5}
        ],
        direction: "right",
        food: {x: 5, y: 5},
    }
}