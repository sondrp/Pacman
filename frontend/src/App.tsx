import { useState } from "react";
import { cn } from "./utils/cn";
import { useWebSocket } from "./hooks/useWebSocket";

const actions: Record<string, string> = {
  ArrowRight: "E",
  ArrowLeft: "W",
  ArrowDown: "S",
  ArrowUp: "N",
} as const;

function App() {
  const { ws, message: board, refresh } = useWebSocket();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!(e.key in actions)) return;
    if (!ws) return;

    const action = actions[e.key];
    ws.send(action);
  };

  return (
    <button
      onKeyDown={handleKeyDown}
      className="relative flex h-screen w-full cursor-default items-center justify-center bg-blue-300"
    >
      {!ws && (
        <button
          onClick={refresh}
          className="absolute left-20 top-20 rounded-md border border-black px-4 py-2"
        >
          Lost connection. Retry?
        </button>
      )}
      <div className="">
        {board.split("/").map((row, rowId) => (
          <div key={rowId} className="flex">
            {row.split("").map((value, colId) => (
              <Square key={rowId + " " + colId} value={value} />
            ))}
          </div>
        ))}
      </div>
    </button>
  );
}

function Square({ value }: { value: string }) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center bg-blue-800",
        value === "x" && "bg-black",
      )}
    >
      {value === "f" && <div className="size-2 rounded-full bg-white"></div>}
      {value === "P" && <Pacman />}
      {value === "b" && <Ghost color="bg-red-500" />}
      {value === "p" && <Ghost color="bg-pink-500" />}
      {value === "i" && <Ghost color="bg-cyan-500" />}
      {value === "c" && <Ghost color="bg-orange-500" />}
    </div>
  );
}

function Ghost({ color }: { color: string }) {
  return (
    <div
      className={cn("relative size-8 overflow-hidden rounded-full", color)}
    ></div>
  );
}

function Pacman() {
  return (
    <div className="relative size-8 overflow-hidden rounded-full bg-yellow-400">
      <div className="absolute -right-2 top-2 size-4 rotate-45 bg-blue-800"></div>
    </div>
  );
}

export default App;
