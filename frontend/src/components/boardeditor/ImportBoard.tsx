import { useState } from "react";
import { cn } from "../../utils/cn";

type Props = {
  setBoard: (board: string) => void;
};

export default function ImportBoard(props: Props) {
  const { setBoard } = props;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const canUse = /^(\w{2,}\/){2,}$/.test(input);

  const handleOpen = () => {
    if (open && canUse) {
      setBoard(input);
      setInput("");
    }
    setOpen(!open);
  };

  return (
    <div className="absolute right-20 top-44 flex gap-4">
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="w-20 rounded-md border-2 border-black bg-blue-600 py-2 text-white"
        >
          Close
        </button>
      )}
      {open && (
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="...board string here..."
          className={cn(
            "min-w-40 grow border-b-2 bg-transparent px-4 py-2 text-center outline-none placeholder:text-gray-600",
          )}
        />
      )}
      <button
        onClick={handleOpen}
        className={cn(
          "w-20 rounded-md border-2 border-black bg-blue-600 py-2 text-white",
          open && "bg-blue-700",
        )}
      >
        {open && canUse && "Use"}
        {open && !canUse && "<---"}
        {!open && "Import"}
      </button>
    </div>
  );
}

/*         
        <button className="absolute right-44 top-32 flex items-center gap-2 rounded-md border-2 border-black bg-white px-4 py-2 text-black">
          <div>{}</div>
          <img className="w-6" alt="copy" src={copy} />
        </button> */
