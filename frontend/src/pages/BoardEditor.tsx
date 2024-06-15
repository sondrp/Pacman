import { useBoard } from "../hooks/useBoard";
import { useTailwindSize } from "../hooks/useTailwindSize";
import SaveBoard from "../components/boardeditor/SaveBoard";
import ExportBoard from "../components/boardeditor/ExportBoard";
import ImportBoard from "../components/boardeditor/ImportBoard";
import Resizer from "../components/boardeditor/Resizer";
import { useState, MouseEvent } from "react";
import TilePanel from "../components/boardeditor/TilePanel";
import Square from "../components/Square";
import BoardView from "../components/BoardView";

export default function BoardEditor() {
  const { board, setBoard, resizers } = useBoard();
  const { size, increase, decrease } = useTailwindSize();

  const [selected, setSelected] = useState("p");

  const handleClick = (index: number) => {
    let newBoard = board;

    if (/[pBbIiNnCc]/.test(selected)) {
      // there can only be one pacman or ghost. Replace existing one before placing somewhere else
      const pattern = RegExp(
        `[${selected.toLowerCase() + selected.toUpperCase()}]`,
        "g",
      );
      newBoard = newBoard.replace(pattern, "d");
    }
    newBoard = newBoard.slice(0, index) + selected + newBoard.slice(index + 1);

    setBoard(newBoard);
  };

  const handleMouseEnter = (e: any, index: number) => {
    e.preventDefault();
    if (e.buttons === 1) {
      handleClick(index);
    }
  };

  const squareRender = (value: string, index: number) => {
    return (
      <Square
        className="cursor-pointer hover:border"
        onDragStart={(e) => handleMouseEnter(e, index)}
        onMouseEnter={(e) => handleMouseEnter(e, index)}
        onClick={() => handleClick(index)}
        squareSize={size}
        key={index}
        value={value}
      />
    );
  };

  return (
    <div className="relative flex min-w-max grow flex-col bg-blue-300 p-4">
      <SaveBoard board={board} />
      <ExportBoard board={board} />
      <ImportBoard setBoard={setBoard} />
      <div className="flex">
        <div className="grid grid-cols-[auto_auto] gap-2">
          <div className="col-start-2 flex justify-between">
            <Resizer
              increase={resizers.addCol}
              decrease={resizers.removeCol}
              className="flex-row"
            />
            <Resizer
              increase={increase}
              decrease={decrease}
              className="flex-row"
            />
          </div>
          <Resizer increase={resizers.addRow} decrease={resizers.removeRow} />
          <BoardView renderSquare={squareRender} board={board} />
        </div>
      </div>
      <TilePanel selected={selected} setSelected={setSelected} />
    </div>
  );
}
