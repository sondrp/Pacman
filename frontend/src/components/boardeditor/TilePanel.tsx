import { cn } from "../../utils/cn";
import Square from "../Square";

type TilePanelProps = {
  selected: string;
  setSelected: (selected: string) => void;
};
const options = ["p", "x", "D", "d", "B", "b", "I", "i", "N", "n", "c", "C"];

export default function TilePanel(props: TilePanelProps) {
  const { selected, setSelected } = props;

  return (
    <div className="absolute bottom-0 left-0 flex h-40 w-full items-center justify-center gap-16 bg-blue-800">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={cn(
            "relative border border-white",
            option === selected && "border-b-4",
          )}
        >
          <Square value={option} squareSize="size-20" />
          {option.toUpperCase() === option && (
            <div className="absolute w-full text-center font-bold text-white">
              Dot
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
