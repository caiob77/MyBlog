import { cn } from "@/lib/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
};

export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-8", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
