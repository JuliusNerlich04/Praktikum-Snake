import type {Point} from "./state";

export function pointsEqual (a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
}

export function isPointOnSnake (point:Point, snake:Point[] ): boolean {
    return (
        snake.some(
            p => pointsEqual(p, point)
        )
    );
}

export function isOutOfBounds (point: Point, gridSize: number): boolean {
    if (point.x >= gridSize || point.y >= gridSize || point.x < 0 || point.y < 0)
        return true;
    else
        return false;
}

