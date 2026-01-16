import type {GameState, Point} from "./state";
import {isPointOnSnake} from "./helpers"

function randomValidPoint (state: GameState): Point {
    let point: Point;
    point = {x: Math.floor(Math.random() * state.gridSize), y: Math.floor(Math.random() * state.gridSize)}
    while (isPointOnSnake(point, state.snake)) {
        point = {x: Math.floor(Math.random() * state.gridSize), y: Math.floor(Math.random() * state.gridSize)}
    }
    return point;
}

export function spawnFood (state: GameState): Point{
    const location= randomValidPoint(state);
    return location;
}