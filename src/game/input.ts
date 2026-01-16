import type {Direction} from "./state"

export function attachKeyboardControls(
    onDirection: (dir: Direction) => void
)  {
    function handleKeyDown(e: KeyboardEvent) {
        const key = e.key.toLowerCase();

        if (key.startsWith("arrow")) e.preventDefault();

        let direction: Direction | null = null;

        switch (key) {
            case "arrowup":
            case "w":
                direction = "up";
                break;

            case "arrowleft":
            case "a":
                direction = "left";
                break;

            case "arrowdown":
            case "s":
                direction = "down";
                break;

            case "arrowright":
            case "d":
                direction = "right";
                break;

            default:
                return;

        }

        onDirection(direction);
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return function detach() {
        window.removeEventListener("keydown", handleKeyDown);
    }
}

