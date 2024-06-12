import { MouseEvent } from "react";
import Square from "../Square";

// TODO : Figure out a way to use BoardView from /components instead. 
// no need for a cusom board view for editing

type BoardProps = {
    board: string;
    squareSize: string;
    handleSquareClick: (index: number) => void;
  };
  
  export default function Board(props: BoardProps) {
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
  