import {describe, it, expect} from "vitest";
import {spawnFood} from "../food";
import type {GameState, Point} from "../state";
import {isPointOnSnake, isOutOfBounds} from "../helpers";

type FoodState = Pick<GameState, "gridSize" | "snake">

function arrange (): FoodState {
    const gridSize = 10;

    const newSnake: Point[] = [];
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (x === 9 && y === 9) continue;
            const newPoint: Point = {x , y};
            newSnake.push(newPoint);
        }
    }
    return { gridSize, snake: newSnake };
}

function act (state: FoodState): Point {
    const food = spawnFood(state)

    return food;
}

function assertFood (state: FoodState, food: Point):void {
    expect(state.snake.length).toBe(99);

    expect(isOutOfBounds(food, state.gridSize)).toBe(false);

    expect(isPointOnSnake(food, state.snake)).toBe(false);

    expect(food).toStrictEqual({x: 9, y: 9});
}

describe("spawnFood", () => {
    it("works even when the snake is very long", () => {
        const state = arrange();
        const food = act(state);
        assertFood(state, food);
    });
});