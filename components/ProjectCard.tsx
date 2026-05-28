import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const href = project.href ?? project.repo ?? "#";
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-[14px] border border-border bg-card p-6 transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)]",
        "hover:-translate-y-1 hover:scale-[1.02] hover:border-border-strong hover:bg-[#202023] hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-text transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span
          aria-hidden
          className="text-text-sub transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        >
          ↗
        </span>
      </div>

      <p className="flex-1 text-sm text-text-muted">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Chip key={s} className="text-[10px]">
            {s}
          </Chip>
        ))}
      </div>
    </a>
  );
}
