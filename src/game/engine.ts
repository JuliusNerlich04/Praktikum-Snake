import type {Direction, GameState, Point} from "./state"

//Snake movement helper Functions
function isOpposite (a: Direction, b: Direction): boolean {
    return (
        (a === "up" && b === "down") ||
        (a === "down" && b === "up") ||
        (a === "left" && b === "right") ||
        (a === "right" && b === "left")
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
//Food spawn helper Functions
function pointsEqual (a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
}

function isPointOnSnake (point:Point, snake:Point[] ): boolean {
    return (
        snake.some(
            p => pointsEqual(p, point)
        )
    );
}

export function tick (state: GameState): GameState{

    //pointsEqual(food, snake[i])

    const desired = state.pendingDirection;
    const direction =
        desired && !isOpposite(desired, state.direction) ? desired : state.direction;
    /*console.log("tick pending: " + state.pendingDirection + " dir: " + state.direction +
    "isOpposite: " + desired ? isOpposite(desired, state.direction) : null);
    */
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