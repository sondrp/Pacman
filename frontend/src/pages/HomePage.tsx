import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import BoardView from "../components/BoardView";

const endpoint = "http://localhost:8000/boards";

type BoardGroup = {
  type: string;
  boards: string[];
};

type QueryResponse = {
  boards: string[][];
};

export default function HomePage() {
  const { data: boardGroups, isSuccess } = useQuery({
    queryKey: ["boards"],
    queryFn: () =>
      axios.get<QueryResponse>(endpoint).then((response) =>
        response.data.boards.map(
          (b) =>
            ({
              type: b[0],
              boards: b[1].split(","),
            }) as BoardGroup,
        ),
      ),
  });

  if (!isSuccess) return <div>Loading...</div>;

  return (
      <div className="flex flex-col gap-20 pt-20 grow">
        {boardGroups.map((group) => (
          <BoardGroupDisplay key={group.type} group={group} />
        ))}
      </div>
  );
}

function BoardGroupDisplay({ group }: { group: BoardGroup }) {
  return (
    <div className="border-t border-black pl-10">
      <div className="text-xl uppercase">
        {group.type}
      </div>
      <div className="flex gap-2">
        {group.boards.map((board) => (
          <Link key={board} to={`/board/${board.replace(/\//g, "-")}`}>
            <BoardView board={board} />
          </Link>
        ))}
      </div>
    </div>
  );
}
