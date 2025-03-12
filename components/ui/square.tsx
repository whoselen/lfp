import { cn } from "@/lib/utils";

const Square = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    data-square
    className={cn(
      "flex size-5 items-center justify-center rounded text-xs font-medium overflow-hidden",
      className
    )}
    aria-hidden="true"
  >
    {children}
  </span>
);
export default Square;
