import {isOutOfBounds , isPointOnSnake} from "./helpers";
import type {Point} from "./state";

export function checkCollision(newHead: Point, bodyToCheck: Point[], gridSize: number): boolean {
    if (isOutOfBounds(newHead, gridSize) || isPointOnSnake(newHead, bodyToCheck)) {
        return true
    } else {
        return false
    }
}