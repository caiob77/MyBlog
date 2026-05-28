import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "a";
  href?: string;
};

export function Card({
  as: Tag = "div",
  className,
  children,
  ...rest
}: CardProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "glass rounded-[14px] p-6 shadow-[var(--shadow-card)] transition-shadow",
        "hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
