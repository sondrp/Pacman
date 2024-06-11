import { cn } from "../../utils/cn";

type ResizerProps = {
  increase: () => void;
  decrease: () => void;
  className?: string;
};

export default function Resizer(props: ResizerProps) {
  const { increase, decrease, className } = props;

  return (
    <div
      className={cn(
        "flex w-fit flex-col items-center gap-2 font-bold",
        className,
      )}
    >
      <button
        onClick={decrease}
        className="flex size-10 select-none items-center justify-center rounded-md border border-black text-2xl"
      >
        -
      </button>
      <button
        onClick={increase}
        className="flex size-10 select-none items-center justify-center rounded-md border border-black"
      >
        +
      </button>
    </div>
  );
}
