import { useBoard } from "../hooks/useBoard";
import { useTailwindSize } from "../hooks/useTailwindSize";
import SaveBoard from "../components/boardeditor/SaveBoard";
import ExportBoard from "../components/boardeditor/ExportBoard";
import ImportBoard from "../components/boardeditor/ImportBoard";
import Resizer from "../components/boardeditor/Resizer";
import { useState, MouseEvent } from "react";
import TilePanel from "../components/boardeditor/TilePanel";
import Square from "../components/Square";

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

  return (
    <div className="relative flex min-h-screen min-w-max flex-col bg-blue-300 p-4">
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
          <Board
            handleSquareClick={handleClick}
            squareSize={size}
            board={board}
          />
        </div>
      </div>
      <TilePanel selected={selected} setSelected={setSelected} />
    </div>
  );
}

type BoardProps = {
  board: string;
  squareSize: string;
  handleSquareClick: (index: number) => void;
};

function Board(props: BoardProps) {
  const { board, squareSize, handleSquareClick } = props;

  const cols = board.indexOf("/") + 1;

  const handleMouseEnter = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    index: number,
  ) => {
    e.preventDefault();
    if (e.buttons === 1) {
      handleSquareClick(index);
    }
  };

  return (
    <div>
      {board.split("/").map((row, rowNo) => (
        <div key={rowNo} className="flex">
          {row.split("").map((value, colNo) => {
            const index = rowNo * cols + colNo;
            return (
              <Square
                onDragStart={(e) => e.preventDefault()}
                onMouseEnter={(e) => handleMouseEnter(e, index)}
                onClick={() => handleSquareClick(index)}
                squareSize={squareSize}
                key={rowNo + "" + colNo}
                value={value}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
