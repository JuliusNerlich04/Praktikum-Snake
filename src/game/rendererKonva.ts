import Konva from "konva";
import {Stage} from "konva/lib/Stage";

export type KonvaRenderer<State> = {
    draw: (state: State) => void;
    destroy: () => void;
}

export type RenderState = {
    gridSize: number;
}

export function createKonvaRenderer<State extends RenderState>(
    container: HTMLDivElement
): KonvaRenderer<State> {
    //Größe aus dem Container holen (muss > 0 sein)
    const size = container.clientWidth;
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
    const layer = new Konva.Layer();
    stage.add(layer);

    function draw(state: State) {
        layer.destroyChildren(); // entfernt alle Shapes aus dem Layer

        const gridSize = state.gridSize;
        const rawCell = size / gridSize;
        const cellSize = Math.floor(rawCell);
        const boardSize = cellSize * gridSize;
        const offset = Math.floor((size - boardSize) / 2);

        //Grid-Linien zeichnen
        for (let i = 0; i < gridSize; i++) {
            const p = 1 * cellSize;

            //vertikale Linien
            layer.add(
                new Konva.Line({
                    points: [p, offset, p, boardSize + offset],
                    stroke: "rgba(255,255,255,0.12)",
                    strokeWidth: 1,
                })
            );

            //horizontale Linien
            layer.add(
                new Konva.Line({
                    points: [offset, p, boardSize + offset, p],
                    stroke: "rgba(255,255,255,0.12)",
                    strokeWidth: 1,
                })
            );
        }

        layer.draw();
    }

    // destroy() - wichtig für SPA-Navigation
    function destroy() {
        stage.destroy();
    }

    return {draw, destroy};
}