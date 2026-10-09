"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { SocialHandle } from "../utils/interface";
import { cn } from "../utils/cn";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  social: SocialHandle[];
}

const navLinks = [
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

const Header = ({ social }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-40"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div
          className={cn(
            "glass mt-3 flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "border-primary/25 shadow-glow"
              : "border-foreground/10 shadow-card"
          )}
        >
          <Link href="/" className="font-display text-sm font-bold tracking-tight">
            <span className="text-gradient">Sachin Maurya</span>
            <span className="ml-2 hidden rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary sm:inline">
              Backend · Cloud · GenAI
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground"
              >
                {l.title}
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
            >
              Let&apos;s talk
            </Link>
            <span className="ml-2">
              <ThemeToggle />
            </span>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="grid size-9 place-items-center rounded-full border border-foreground/10 text-foreground md:hidden"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="glass mt-2 rounded-2xl border border-foreground/10 p-3 md:hidden"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-[15px] text-foreground/80 hover:bg-foreground/5"
                )}
              >
                {l.title}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-2 border-t border-foreground/10 pt-3">
              {social
                .filter((s) => s.enabled)
                .map((s) => (
                  <Link
                    key={s._id}
                    href={s.url}
                    target="_blank"
                    className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-foreground/70"
                  >
                    {s.platform}
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
