import {isOutOfBounds , isPointOnSnake} from "./helpers";
import type {Point, GameState} from "./state";

export function checkCollision(newHead: Point, state: GameState) {
    if (isOutOfBounds(newHead, state.gridSize) || isPointOnSnake(newHead, state.snake)) {
        return true
    } else {
        return false
    }
}