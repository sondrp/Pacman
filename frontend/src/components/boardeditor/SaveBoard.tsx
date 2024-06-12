import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { cn } from "../../utils/cn";

const endpoint = "http://localhost:8000/create";

export default function SaveBoard({ board }: { board: string }) {
  const [buttonText, setButtonText] = useState("Save");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("all");

  const { mutate } = useMutation({
    mutationFn: () => axios.post(endpoint, { board, type: selected }),
    onMutate: () => setButtonText("Loading..."),
    onSuccess: () => {
      setButtonText("Saved!");
      setTimeout(() => {
        setButtonText("Save");
      }, 3000);
    },
    onError: (e) => {
      console.log(e);
      setButtonText("Error");
      setTimeout(() => {
        setButtonText("Save");
      }, 3000);
    },
  });


  const options = ["all", "search", "adverserial", "markov"];

  return (
    <div className="absolute right-20 top-20 flex min-w-20 text-white">
      <button
        className="grow rounded-l-md border-y-2 border-l-2 border-black bg-green-600 p-2"
        onClick={() => mutate()}
      >
        {buttonText}
      </button>
      <div className="rounded-r-md border-2 border-black bg-blue-600 px-1">
        {!open && (
          <button onClick={() => setOpen(true)} className="-mt-1 py-2">
            ...
          </button>
        )}
        {open && (
          <div className="flex gap-4 px-2 py-2">
            {options.map((option) => (
              <button
                onClick={() => setSelected(option)}
                className={cn(
                  "first-letter:uppercase",
                  option === selected && "underline",
                )}
                key={option}
              >
                {option}
              </button>
            ))}

            <button onClick={() => setOpen(false)} className="text-gray-400">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// rounded-md border-2 border-black
