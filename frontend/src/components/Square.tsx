import { Pacman } from "../App";
import { cn } from "../utils/cn";

// TODO : improve this logic. Use a map instead maybe
// no point in doing this many checks for each value

type SquareProps = {
  value: string;
  squareSize?: string;
  handleClick?: () => void;
};

export default function Square(props: SquareProps) {
  const { value, squareSize, handleClick } = props;
  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center bg-blue-800 hover:border",
        !squareSize ? "size-10" : squareSize,
        value === "x" && "bg-black",
      )}
    >
      {value === "p" && <Pacman />}
      {value === "D" && <div className={cn("size-4 rounded-full bg-white")} />}
      {"bB".includes(value) && <Ghost className="text-red-500" />}
      {"iI".includes(value) && <Ghost className="text-cyan-500" />}
      {"nN".includes(value) && <Ghost className="text-pink-500" />}
      {"cC".includes(value) && <Ghost className="text-orange-500" />}
    </div>
  );
}

function Ghost({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      className={cn("size-2/3 animate-pulse", className)}
    >
      <path d="M50.8 452.1l-31.6 25.3c-2.1 1.7-4.7 2.6-7.4 2.6C5.3 480 0 474.7 0 468.2V192C0 86 86 0 192 0s192 86 192 192v276.2c0 6.5-5.3 11.8-11.8 11.8-2.7 0-5.3-.9-7.4-2.6l-31.6-25.3c-3.3-2.7-7.5-4.1-11.8-4.1-5.9 0-11.5 2.8-15 7.5l-37.6 50.1c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4l-38.4-51.2c-3-4-7.8-6.4-12.8-6.4s-9.8 2.4-12.8 6.4l-38.4 51.2c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4l-37.6-50.1c-3.6-4.7-9.1-7.5-15-7.5-4.3 0-8.4 1.5-11.7 4.1zM160 192c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32zm96 32c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" />
    </svg>
  );
}
