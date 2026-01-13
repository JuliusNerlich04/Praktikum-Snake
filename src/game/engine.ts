import type {Direction, GameState, Point} from "./state"
import {createKonvaRenderer} from "./rendererKonva";

function isOpposite (a: Direction, b: Direction): boolean {
    return (
        (a === "up" || b === "down") ||
        (a === "down" || b === "up") ||
        (a === "left" || b === "right") ||
        (a === "right" || b === "left")
    );
}

function nextHead (head: {x: number, y:number}, dir: Direction) {
    switch (dir) {
        case "left":
            return{
                x: head.x - 1,
                y: head.y,
            };

        case "right":
            return{
                x: head.x + 1,
                y: head.y,
            };

        case "up":
            return{
                x: head.x,
                y: head.y - 1,
            };

        case "down":
            return{
                x: head.x,
                y: head.y + 1,
            };
    }
}

export function tick (state: GameState): GameState{
    const desired = state.pendingDirection;
    const direction =
        desired && !isOpposite(desired, state.direction) ? desired : state.direction;

    const head = state.snake[0];
    const newHead = nextHead(head, direction);
    const newSnake = [
        newHead,
        ...state.snake.slice(0, -1),
    ];

    return{
        ...state,
        direction,
        pendingDirection: undefined,
        snake: newSnake,
    };
}