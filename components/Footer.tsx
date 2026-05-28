import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Artigos" },
  { href: "/projects", label: "Projetos" },
  { href: "/about", label: "Sobre" },
  { href: "/rss.xml", label: "RSS" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/caiob77", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/caio-beniel-82381b22b/",
    label: "LinkedIn",
  },
  { href: "https://www.instagram.com/benielsena_bx/", label: "Instagram" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="mt-32 border-t border-border">
      <Container>
        <div className="border-b border-border py-12 md:py-14">
          <div>
            <p className="text-xs font-black uppercase text-text-sub">
              Caio
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex font-display text-5xl font-black leading-none text-text transition-colors hover:text-accent md:text-6xl"
            >
              Beniel
              <span className="text-accent">+</span>
            </Link>
          </div>

          <div className="mt-14 grid max-w-xl gap-10 sm:grid-cols-2 sm:gap-20 md:mt-16">
            <FooterColumn title="Guide Blog" links={NAV_LINKS} />
            <FooterColumn title="Mídias sociais" links={SOCIAL_LINKS} external />
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-sm font-medium text-text-sub md:flex-row md:items-center md:justify-between">
          <p>© {year} Caio Beniel Pereira de Sena.</p>
          <p>Construído com Next.js, Tailwind e Motion.</p>
        </div>
      </Container>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: { href: string; label: string }[];
  external?: boolean;
};

function FooterColumn({ title, links, external = false }: FooterColumnProps) {
  return (
    <nav aria-label={title} className="min-w-36">
      <h2 className="font-display text-xl font-bold text-text md:text-2xl">
        {title}
      </h2>
      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-sm font-semibold text-text-muted transition-colors hover:text-accent md:text-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
