import { useState } from "react";

const BOARD = "xxxxxxxxxxxxxxxxxxxxxxxxxx/xDDBINCDDxxxxxxxxxxxxxxxxx/xDDDDDDDDxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxx/";

type BoardResizers = {
  addRow: () => void,
  removeRow: () => void,
  addCol: () => void,
  removeCol: () => void,
}

export function useBoard(initialBoard: string = BOARD) {
  const [board, setBoard] = useState(initialBoard);

  const cols = board.indexOf("/");

  const addRow = () => {
    const newBoard = board + "x".repeat(cols) + "/";
    setBoard(newBoard);
  };

  const removeRow = () => {
    const rows = board.split("/")
    if (rows.length < 4) return
    let newBoard = rows.slice(0, -3).join("/");
    newBoard += "/" + "x".repeat(cols) + "/";
    setBoard(newBoard);
  };

  const addCol = () => {
    const newBoard = board.replace(/\//g, "x/");
    setBoard(newBoard);
  };

  const removeCol = () => {
    const newBoard = board.replace(/\w(\w\/)/g, "$1");
    setBoard(newBoard);
  };

  const resizers: BoardResizers = { addRow, removeRow, addCol, removeCol }

  return { board, setBoard, resizers };
}
