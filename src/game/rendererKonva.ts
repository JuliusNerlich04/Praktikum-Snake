import Konva from "konva";
import type { GameState } from "./state"

export type KonvaRenderer<TState> = {
    drawGrid: (state: TState) => void;
    draw: (state: TState) => void;
    destroy: () => void;
}

export function createKonvaRenderer<State extends GameState>(
    container: HTMLDivElement
): KonvaRenderer<State> {
    //Größe aus dem Container holen (muss > 0 sein)
    const size = container.clientWidth;
    let cellSize: number;
    let boardSize: number;
    let offset: number;
    let gridSize: number;
    let rawCell: number;
    if (size <= 0) {
        throw new Error("Konva Container has no size (clientWidth is 0)");
    }

    container.innerHTML = "";

    // Stage erstellen
    const stage = new Konva.Stage({
        container,
        width: size,
        height: size,
    });

    //Layer erstellen + Stage hinzufügen
    const gridLayer = new Konva.Layer();
    stage.add(gridLayer);
    const entityLayer = new Konva.Layer();
    stage.add(entityLayer);
    let gridReady = false;

    function drawGrid(state: GameState) {
        gridLayer.destroyChildren(); // entfernt alle Shapes aus dem Layer


        gridSize = state.gridSize;
        rawCell = size / gridSize;
        cellSize = Math.floor(rawCell);
        boardSize = cellSize * gridSize;
        offset = Math.floor((size - boardSize) / 2);

        //Grid-Linien zeichnen
        for (let i = 0; i <= gridSize; i++) {
            const p = offset + i * cellSize;

            //vertikale Linien
            gridLayer.add(
                new Konva.Line({
                    points: [p, offset, p, boardSize + offset],
                    stroke: "rgba(255,255,255,0.12)",
                    strokeWidth: 1,
                })
            );

            //horizontale Linien
            gridLayer.add(
                new Konva.Line({
                    points: [offset, p, boardSize + offset, p],
                    stroke: "rgba(255,255,255,0.12)",
                    strokeWidth: 1,
                })
            );
        }


        gridLayer.draw();
        gridReady = true;
    }



    function draw(state: GameState) {

        if (!gridReady) {
            throw new Error("Grid is not Ready");
        }else {console.log("Grid is ready");}

        entityLayer.destroyChildren();


        //Entities zeichnen
        const food = state.food;

        //Snake zeichnen
        state.snake.forEach((segment, i) => {

            entityLayer.add(
                new Konva.Rect({
                    x: offset + segment.x * cellSize,
                    y: offset + segment.y * cellSize,
                    width: cellSize,
                    height: cellSize,
                    fill: i === 0 ? "rgba(130,255,130,0.7)" : "rgba(130,255,130,0.5)",
                })
            )
        });
        //Food zeichnen
        entityLayer.add(
            new Konva.Circle({
                x: offset + food.x * cellSize + cellSize / 2,
                y: offset + food.y * cellSize + cellSize / 2,
                radius: cellSize * 0.4,
                fill: "rgba(255,130,130,0.6)",
            })
        )

        entityLayer.draw();
    }

    // destroy() - wichtig für SPA-Navigation
    function destroy() {
        stage.destroy();
    }

    return {drawGrid, draw, destroy};
}