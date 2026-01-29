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

function isValidDirection(a: Direction, b: Direction): boolean {
    return !(isOpposite(a, b) || a == b);
}

function extractLastValidDirections(pendingActions: Direction[] | undefined, currentDirection: Direction, numberOfActions = 2): Direction[] {
    if (!pendingActions || pendingActions.length == 0) return [];
    let extractedPendingActions: Direction[] = [];
    while (true) {
        let lastValidDirection = pendingActions.find(el => isValidDirection(el, currentDirection));
        if (!lastValidDirection) break;
        currentDirection = lastValidDirection;
        extractedPendingActions.push(lastValidDirection);
        if (extractedPendingActions.length == numberOfActions) break;
    }
    return extractedPendingActions;
}

function nextHead(head: Point, direction: Direction): Point {
    switch (direction) {
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

    state.pendingDirections = extractLastValidDirections(state.pendingDirections, state.direction);
    state.direction = state.pendingDirections[0] ?? state.direction;
    [, ...state.pendingDirections] = state.pendingDirections;
    const head = state.snake[0];
    const newHead = nextHead(head, state.direction);
    const willEat = pointsEqual(newHead, state.food);

    const bodyToCheck = willEat
        ? state.snake
        : state.snake.slice(0, -1);


    const willCollide = checkCollision(newHead, bodyToCheck, state.gridSize);
    state.snake = [newHead, ...state.snake];
    state = setNextGameState(state, willCollide, willEat);
    return state;
}

function updateSnake(snake: Point[], nextHead: Point) {
}

function setNextGameState(state: GameState, willCollide: boolean, willEat: boolean) {
    const nextPendingDirections = extractLastValidDirections(state.pendingDirections, state.direction)
    state = {
        ...state,
        pendingDirections: nextPendingDirections,
    };
    if (willCollide) {
        state = {
            ...state,
            isGameOver: true,
            snake: [...state.snake.slice(0, -1)],
            pendingDirections: [],
        }
    }

    if (willEat) {
        const newScore = state.score + 1
        const newFood = spawnFood(state);
        state = {
            ...state,
            food: newFood,
            score: newScore,
        };
    } else {
        state = {
            ...state,
            snake: [...state.snake.slice(0, -1)],
        };
    }
    return state;
}