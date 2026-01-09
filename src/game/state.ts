
export type Point = { x: number, y: number };

export type GameState = {
    gridSize: number;
    snake: Point[];
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
        food: {x: 5, y: 5},
    }
}