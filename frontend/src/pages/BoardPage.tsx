import { useParams } from "react-router-dom";
import BoardView from "../components/BoardView";
import { useWebSocket } from "../hooks/useWebSocket";
import { useEffect } from "react";

const keyboardMap: Record<string, string> = {
  ArrowRight: "E",
  ArrowDown: "S",
  ArrowLeft: "W",
  ArrowUp: "N",
};

export default function BoardPage() {
  const { id } = useParams();
  if (!id) throw Error("bad params");

  const { ws, board, refresh } = useWebSocket(id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!ws) return;
      if (!(e.key in keyboardMap)) return;
      ws.send(keyboardMap[e.key]);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ws]);

  return (
    <div className="bg-blue relative flex grow items-center justify-center bg-blue-300">
      {!ws && (
        <button
          onClick={refresh}
          className="absolute left-10 top-10 rounded-md border px-4 py-2"
        >
          Lost connection. Retry?
        </button>
      )}
      <BoardView board={board} />
    </div>
  );
}
