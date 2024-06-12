import Square, { SquareProps } from "./Square";
import { MouseEvent } from "react";

type BoardViewProps = {
  getClickIndex?: (index: number) => void,
  board: string;
} & Omit<SquareProps, "value">;

export default function BoardView(props: BoardViewProps) {
  const { board, onClick, getClickIndex, ...squareprops } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, index: number) => {
    if (!!onClick) {
      onClick(e)
    }
    if (!!getClickIndex) {
      getClickIndex(index)
    }
  }

  const cols = board.indexOf("/") + 1


  return (
    <div>
      {board.split("/").map((row, rowNo) => (
        <div key={rowNo} className="flex">
          {row.split("").map((value, colNo) => {
            const index = rowNo * cols + colNo
            return (
            <Square onClick={e => handleClick(e, index)} {...squareprops} key={index} value={value} />
          )})}
        </div>
      ))}
    </div>
  );
}
