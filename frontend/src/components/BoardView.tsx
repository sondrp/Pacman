import {ReactNode } from "react";
import Square from "./Square";

type BoardViewProps = {
  renderSquare?: (value: string, index: number) => ReactNode;
  board: string;
};

export default function BoardView(props: BoardViewProps) {
  const { board, renderSquare: _renderSquare } = props;

  // use default function for square render if none is provided. This is terrible code but oh well
  const renderSquare = !_renderSquare ? 
  (value: string, index: number) => <Square key={index} value={value} /> :
  _renderSquare

  const cols = board.indexOf("/") + 1;

  return (
    <div>
      {board.split("/").map((row, rowNo) => (
        <div key={rowNo} className="flex">
          {row
            .split("")
            .map((value, colNo) => renderSquare(value, cols * rowNo + colNo))}
        </div>
      ))}
    </div>
  );
}
