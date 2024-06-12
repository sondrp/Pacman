import { useParams } from "react-router-dom";
import BoardView from "../components/BoardView";

export default function BoardPage() {
  const { id } = useParams();
  if (!id) throw Error("bad params");

  const board = id.replace(/-/g, "/");
  console.log(board);

  return (
    <div className="bg-blue flex items-center justify-center bg-blue-300">
        <BoardView className="hover:border-none" board={board} />
    </div>
  );
}
