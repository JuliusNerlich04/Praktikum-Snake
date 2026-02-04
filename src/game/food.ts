import type {GameState, Point} from "./state";
import {isPointOnSnake} from "./helpers"

function randomValidPoint (state: Pick<GameState, "gridSize" | "snake">): Point {
    let point: Point;
    point = {x: Math.floor(Math.random() * state.gridSize), y: Math.floor(Math.random() * state.gridSize)}
    while (isPointOnSnake(point, state.snake)) {
        point = {x: Math.floor(Math.random() * state.gridSize), y: Math.floor(Math.random() * state.gridSize)}
    }
    return point;
}

export function spawnFood (state: Pick<GameState, "gridSize" | "snake">): Point{
    return randomValidPoint(state);
}