import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import BoardView from "../components/BoardView";

const endpoint = "http://localhost:8000/boards";

// TODO use the id as link instead.
// the board comes from the websocket

type Board = {
  id: string;
  board: string;
  type: string;
};

export default function HomePage() {
  const { data: boards, isSuccess } = useQuery({
    queryKey: ["boards"],
    queryFn: () =>
      axios.get<Board[]>(endpoint).then((response) => response.data),
  });

  if (!isSuccess) return <div>Loading...</div>;

  console.log(boards);

  return (
    <div className="flex grow flex-col gap-20 p-20">
      {boards.map((board) => (
        <Link key={board.id} to={`/board/${board.id}`}>
          <p>{board.type}</p>
          <BoardView board={board.board} />
        </Link>
      ))}
    </div>
  );
}
