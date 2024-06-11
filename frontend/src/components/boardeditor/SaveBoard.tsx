import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

async function save(board: string) {
  return await axios.post("http://localhost:8000/create", { board: board });
}

export default function SaveBoard({ board }: { board: string }) {
  const [buttonText, setButtonText] = useState("Save");

  const { mutate } = useMutation({
    mutationFn: () => save(board),
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

  return (
    <button
      onClick={() => mutate()}
      className="absolute right-20 top-20 w-20 rounded-md border-2 border-black bg-green-600 py-2 text-white"
    >
      {buttonText}
    </button>
  );
}
