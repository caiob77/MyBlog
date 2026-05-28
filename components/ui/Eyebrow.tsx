import { cn } from "@/lib/cn";

type EyebrowProps = React.HTMLAttributes<HTMLSpanElement>;

export function Eyebrow({ className, children, ...rest }: EyebrowProps) {
  return (
    <span className={cn("eyebrow", className)} {...rest}>
      {children}
    </span>
  );
}
