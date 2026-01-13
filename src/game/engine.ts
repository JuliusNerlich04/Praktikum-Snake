import type { GameState, Point } from "./state"

export function tick (state: GameState) {
    const head = state.snake[0];
    let newHead: Point;

        switch (state.direction) {
            case "left":
                newHead = {
                    x: head.x - 1,
                    y: head.y,
                };
                break;

            case "right":
                newHead = {
                    x: head.x + 1,
                    y: head.y,
                };
                break;

            case "up":
                newHead = {
                    x: head.x,
                    y: head.y - 1,
                };
                break;

            case "down":
                newHead = {
                    x: head.x,
                    y: head.y + 1,
                };

                break;
        }

    const newSnake = [
        newHead,
        ...state.snake.slice(0, -1),
    ];

    return{
        ...state,
        snake: newSnake,
    };
}