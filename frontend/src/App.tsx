import { useState } from "react";
import { cn } from "./utils/cn";

const BOARD = `bbbbbbbbbbbbbbbbbbb/bfffbffff  fffbfffb/bfbfbfbbbbbbbbbfbfb/bffffp fffffffffffb/bbbbbfbbfbfbbbbbbfb/bbbbbbbbffffffffffb/bbbbbbbbbbbbbbbbbbb`;

type Action = {
  when: RegExp,
  replacement: string,
}


const actions: Record<string ,Action> = {
  'ArrowRight': {when: /p[f ]/, replacement: ' p'},
  'ArrowLeft': {when: /[f ]p/, replacement: 'p '},
  'ArrowDown': {when: /p(.{19})[f ]/, replacement: ' $1p'},
  'ArrowUp': {when: /[f ](.{19})p/, replacement: 'p$1 '}
} as const

function App() {
  const [board, setBoard] = useState(BOARD)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!(e.key in actions)) return

    const { when, replacement } = actions[e.key]
    if (!when.test(board)) return

    setBoard(board.replace(when, replacement))
  }

  return (
    <button onKeyDown={handleKeyDown} className="flex cursor-default h-screen w-full items-center justify-center bg-blue-300">
      <div className="flex w-[47.5rem] flex-wrap">
        {board.split("").filter(l => l !== "/").map((value, i) => (
          <Square key={i} value={value} />
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
        value === "b" && "bg-black",
      )}
    >
      {value === "f" && <div className="size-2 rounded-full bg-white"></div>}
      {value === "p" && <Pacman />}
    </div>
  );
}

function Pacman() {
  return <div className="size-8 overflow-hidden rounded-full bg-yellow-400 relative">
    <div className="absolute size-4 bg-blue-800 rotate-45 top-2 -right-2"></div>
  </div>
}

export default App;
