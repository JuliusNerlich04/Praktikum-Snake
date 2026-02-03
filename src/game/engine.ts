import type {Direction, Point, GameState} from "./state"
import {spawnFood} from "./food";
import {pointsEqual} from "./helpers";
import {checkCollision} from "./collision";

//Snake movement helper Functions
function isOpposite (a: Direction, b: Direction): boolean {
    return (
        (a === "up" && b === "down") ||
        (a === "down" && b === "up") ||
        (a === "left" && b === "right") ||
        (a === "right" && b === "left")
    );
}

function nextHead (head: Point, dir: Direction) {
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

    if (state.isGameOver) return state;

    const desired = state.pendingDirection;
    const direction =
        desired && !isOpposite(desired, state.direction) ? desired : state.direction;
    const head = state.snake[0];
    const newHead = nextHead(head, direction);
    const willEat = pointsEqual(newHead, state.food);

    const bodyToCheck = willEat
        ? state.snake
        : state.snake.slice(0, -1);


    if (checkCollision(newHead, bodyToCheck, state.gridSize)) {
        return {
            ...state,
            isGameOver: true,
            pendingDirection: undefined,
        }
    }

    if (willEat) {
        const newSnake = [
            newHead,
            ...state.snake,
        ]
        const newScore = state.score + 1
        const newFood = spawnFood({...state, snake: newSnake});
        return{
            ...state,
            direction,
            food: newFood,
            pendingDirection: undefined,
            snake: newSnake,
            score: newScore,
        };
    } else {
        const newSnake = [
            newHead,
            ...state.snake.slice(0, -1),
        ]
        return{
            ...state,
            direction,
            pendingDirection: undefined,
            snake: newSnake,
        };
    }

}