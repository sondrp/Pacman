import { useState } from "react";
import { cn } from "../../utils/cn";
import copy from "../../assets/copy.svg";

export default function ExportBoard({ board }: { board: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(board);
  };

  const handleOpen = () => {
    if (open) 
        setCopied(false)
    setOpen(!open)
  }

  return (
    <>
      {open && (
        <button
          onClick={handleCopy}
          className="absolute right-44 top-32 flex items-center gap-2 rounded-md border-2 border-black bg-white px-4 py-2 text-black"
        >
          <div>{copied ? "copied to clipboard" : board}</div>
          <img className="w-6" alt="copy" src={copy} />
        </button>
      )}
      <button
        onClick={handleOpen}
        className={cn(
          "absolute right-20 top-32 w-20 rounded-md border-2 border-black bg-blue-600 py-2 text-white",
          open && "bg-blue-700",
        )}
      >
        Export
      </button>
    </>
  );
}
