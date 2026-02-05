import type { Direction } from "../game/state";

export type UpdateParams = (
  currentDirection: Direction,
  actionsStack: Direction[] | undefined,
) => void
export type ControlsDebugNode = {
  componentContainer: HTMLDivElement;
  update: UpdateParams;
}
export function addControlsDebugNode(parentNode: HTMLElement): ControlsDebugNode {
  parentNode.innerHTML = `
        <div id="control-queue">
            Control Queue:<br>
            Current Direction: <p id="current-direction"><p><br>
            Direction Stack: <p id="controls-stack"><p>
        </div>
    `;
  const componentContainer = parentNode.querySelector<HTMLDivElement>("#control-queue");
  const currentDirectionText = parentNode.querySelector<HTMLDivElement>("#current-direction");
  const actionsStackText = parentNode.querySelector<HTMLDivElement>("#controls-stack");
  if (!componentContainer || !currentDirectionText || !actionsStackText) {
    throw new Error(`Layout elements not found: ${[componentContainer, currentDirectionText, actionsStackText]}`);
  }
  const update = function(currentDirection: Direction, actionsStack: Direction[] | undefined) {
    currentDirectionText.innerText = directionToString(currentDirection);
    actionsStack = actionsStack ?? [];
    let directionSequence = actionsStack.map((el) => {
      return directionToString(el)
    });
    actionsStackText.innerText = directionSequence.join(" ");
  }

  return { componentContainer, update };
}

function directionToString(dir: Direction) {
  switch (dir) {
    case "up":
      return "⬆️";
    case "right":
      return "➡️";
    case "down":
      return "⬇️";
    case "left":
      return "⬅️";
  }
}
