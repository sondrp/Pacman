import { useParams } from "react-router-dom";
import BoardView from "../components/BoardView";

// TODO : fix the params. I would like to not use / in the board definition, as it messes with the path

export default function BoardPage() {
  const { id } = useParams();
  if (!id) throw Error("bad params");

  const board = id.replace(/-/g, "/");

  return (
    <div className="bg-blue flex grow items-center justify-center bg-blue-300">
      <BoardView board={board} />
    </div>
  );
}
