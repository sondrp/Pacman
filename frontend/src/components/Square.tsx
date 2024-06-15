import { HTMLProps, ReactNode } from "react";
import { cn } from "../utils/cn";
import Pacman from "./Pacman";

export type SquareProps = {
  value: string;
  squareSize?: string;
  className?: string
} & HTMLProps<HTMLDivElement>;

const SquareContentMap: Record<string, ReactNode> = {
  p: <Pacman />,
  D: <div className={cn("size-1/4 rounded-full bg-white")} />,
  b: <Ghost className="text-red-500" />,
  i: <Ghost className="text-cyan-500" />,
  n: <Ghost className="text-pink-500" />,
  c: <Ghost className="text-orange-500" />,
  G: <Star />
};

export default function Square(props: SquareProps) {
  const { value, squareSize, className, ...divprops } = props;
  const size = !squareSize ? "size-10" : squareSize;

  const mapKey = /[BNIC]/.test(value) ? value.toLowerCase() : value;

  return (
    <div
      {...divprops}
      className={cn(
        "flex items-center justify-center bg-blue-800",
        size,
        value === "x" && "bg-black",
        className,
      )}
    >
      {SquareContentMap[mapKey]}
    </div>
  );
}

function Ghost({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      className={cn("size-2/3 animate-pulse select-none", className)}
    >
      <path d="M50.8 452.1l-31.6 25.3c-2.1 1.7-4.7 2.6-7.4 2.6C5.3 480 0 474.7 0 468.2V192C0 86 86 0 192 0s192 86 192 192v276.2c0 6.5-5.3 11.8-11.8 11.8-2.7 0-5.3-.9-7.4-2.6l-31.6-25.3c-3.3-2.7-7.5-4.1-11.8-4.1-5.9 0-11.5 2.8-15 7.5l-37.6 50.1c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4l-38.4-51.2c-3-4-7.8-6.4-12.8-6.4s-9.8 2.4-12.8 6.4l-38.4 51.2c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4l-37.6-50.1c-3.6-4.7-9.1-7.5-15-7.5-4.3 0-8.4 1.5-11.7 4.1zM160 192c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32zm96 32c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" className="size-full select-none text-yellow-500">
      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
    </svg>
  );
}
