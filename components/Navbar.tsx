"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

// Link do nav (desktop): cor → accent + underline que cresce da esquerda no hover.
const navLink =
  "relative font-display text-[13px] font-extrabold uppercase text-text transition-colors hover:text-accent after:pointer-events-none after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform hover:after:scale-x-100";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0.5, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  // Fecha o menu ao trocar de rota.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    setOpen(false);
    router.push(query ? `/archive?q=${encodeURIComponent(query)}` : "/archive");
  }

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <motion.div
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (o) => `rgba(4, 4, 5, ${o})`,
          ),
          borderColor: useTransform(
            borderOpacity,
            (o) => `rgba(255, 255, 255, ${Math.max(o, 0.16)})`,
          ),
        }}
        className="mx-auto max-w-[1670px] overflow-hidden rounded-[32px] border shadow-[0_18px_55px_rgba(0,0,0,0.32)] backdrop-blur-[16px]"
      >
        <Container className="flex h-[62px] max-w-none items-center justify-between px-5 md:px-9">
          <Link
            href="/"
            className="font-display text-2xl font-bold text-text transition-colors hover:text-accent md:text-[26px]"
          >
            Beniel<span className="text-accent">+</span>
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            <nav className="hidden items-center gap-8 lg:flex">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={navLink}>
                  {l.label}
                </Link>
              ))}
              <Link
                href="https://github.com/caiob77"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1 ${navLink}`}
              >
                GitHub
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.4}
                />
              </Link>
            </nav>

            <form
              role="search"
              onSubmit={handleSearch}
              className="hidden h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors focus-within:border-accent/60 md:flex md:h-[42px] md:w-44 md:px-5"
            >
              <Search
                aria-hidden
                className="h-4 w-4 shrink-0 text-text-sub"
                strokeWidth={2.2}
              />
              <label htmlFor="navbar-search" className="sr-only">
                Search
              </label>
              <input
                id="navbar-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent font-display text-sm font-medium text-text outline-none placeholder:text-text-muted"
              />
            </form>

            {/* Botão Menu (mobile/tablet) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 font-display text-[13px] font-extrabold uppercase text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 [transition-timing-function:var(--ease-obsidian)] hover:scale-[1.03] hover:border-accent/60 hover:text-accent active:scale-95 lg:hidden"
            >
              {open ? (
                <X aria-hidden className="h-4 w-4" strokeWidth={2.4} />
              ) : (
                <Menu aria-hidden className="h-4 w-4" strokeWidth={2.4} />
              )}
              {open ? "Fechar" : "Menu"}
            </button>
          </div>
        </Container>

        {/* Painel do menu mobile */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-white/10 px-5 pb-5 pt-3">
                {/* Busca (só onde a barra de busca do topo não aparece) */}
                <form
                  role="search"
                  onSubmit={handleSearch}
                  className="mb-2 flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 transition-colors focus-within:border-accent/60 md:hidden"
                >
                  <Search
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-text-sub"
                    strokeWidth={2.2}
                  />
                  <label htmlFor="mobile-search" className="sr-only">
                    Search
                  </label>
                  <input
                    id="mobile-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search"
                    className="min-w-0 flex-1 bg-transparent font-display text-sm font-medium text-text outline-none placeholder:text-text-muted"
                  />
                </form>

                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-3 py-3 font-display text-base font-extrabold uppercase text-text transition-all duration-200 [transition-timing-function:var(--ease-obsidian)] hover:translate-x-1.5 hover:bg-white/[0.06] hover:text-accent"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="https://github.com/caiob77"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center gap-1.5 rounded-2xl px-3 py-3 font-display text-base font-extrabold uppercase text-text transition-all duration-200 [transition-timing-function:var(--ease-obsidian)] hover:translate-x-1.5 hover:bg-white/[0.06] hover:text-accent"
                >
                  GitHub
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2.4}
                  />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
