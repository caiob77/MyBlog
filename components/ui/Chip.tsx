import { cn } from "@/lib/cn";

type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "accent";
};

export function Chip({
  variant = "default",
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium leading-none",
        variant === "default" &&
          "border-border bg-elevated/40 text-text-muted",
        variant === "accent" &&
          "border-accent/40 bg-accent/10 text-accent",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
