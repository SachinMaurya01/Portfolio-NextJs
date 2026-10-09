"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { SectionHeading } from "./ui/Typography";
import { Project } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { useVariants } from "../utils/hooks";
import { cn } from "../utils/cn";

interface ProjectsProps {
  projects: Project[];
}

const ALL_FILTERS = ["All", "AI / RAG", "Backend", "Full-Stack", "CLI / Tooling"];

function tagFor(p: Project): string[] {
  const stack = p.techStack.join(" ").toLowerCase();
  const tags: string[] = [];
  if (/langchain|langgraph|rag|groq|tavily|tensorflow|scikit|keras/.test(stack))
    tags.push("AI / RAG");
  if (/gin|postgres|redis|sqs|fastapi|microservice|pgx/.test(stack))
    tags.push("Backend");
  if (/react|next|streamlit/.test(stack)) tags.push("Full-Stack");
  if (/typer|rich|pytest|cli/.test(stack)) tags.push("CLI / Tooling");
  return tags.length ? tags : ["Backend"];
}

function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState("All");
  const { setVariant } = useVariants();
  const live = useMemo(
    () => projects.filter((p) => p.enabled).sort((a, b) => a.sequence - b.sequence),
    [projects]
  );
  const shown =
    filter === "All" ? live : live.filter((p) => tagFor(p).includes(filter));

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
      <SectionHeading>
        <SlideIn className="text-sm uppercase tracking-[0.25em] text-primary">
          Selected work · from GitHub
        </SlideIn>
        <SlideIn className="font-display mt-2 block text-3xl font-bold tracking-tight md:text-5xl">
          Work backed by <span className="text-gradient">code and docs</span>
        </SlideIn>
      </SectionHeading>
      <Transition className="mt-3 max-w-2xl text-sm text-foreground/60 md:text-base">
        <p>
          Sourced directly from github.com/SachinMaurya01: RAG systems,
          fraud ML, Go microservices backend, multi-agent research and a
          production CLI.
        </p>
      </Transition>

      <Transition className="mt-6 flex flex-wrap gap-2">
        {ALL_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              filter === f
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-foreground/10 bg-foreground/5 text-foreground/60 hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </Transition>

      <div className="mt-8 grid gap-4 md:grid-cols-6">
        {shown.map((p, i) => (
          <motion.div
            key={p._id}
            layout
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            className={cn(i < 2 ? "md:col-span-3" : "md:col-span-2")}
          >
            <article
              className="bento-card spotlight group flex h-full flex-col"
              onMouseEnter={() => setVariant("PROJECT")}
              onMouseLeave={() => setVariant("DEFAULT")}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
                el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
              }}
            >
              <div className="relative h-44 overflow-hidden md:h-52">
                <motion.img
                  src={p.image.url}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  {tagFor(p).map((t) => (
                    <span
                      key={t}
                      className="glass rounded-full border border-foreground/15 px-2.5 py-1 text-[11px] font-medium text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold leading-snug text-foreground md:text-xl">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-foreground/60">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techStack.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-foreground/70 ring-1 ring-foreground/10"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-foreground/10 pt-4">
                  <Link
                    href={p.githuburl}
                    target="_blank"
                    className="flex-1 rounded-full bg-foreground/5 px-4 py-2 text-center text-sm font-semibold text-foreground ring-1 ring-foreground/10 transition hover:border-primary/40 hover:text-primary"
                  >
                    GitHub ↗
                  </Link>
                  {p.liveurl ? (
                    <Link
                      href={p.liveurl}
                      target="_blank"
                      className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                    >
                      Live ↗
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-foreground/40">
        Want the deep-dive? READMEs, benchmarks and architecture diagrams live on
        each repo.
      </p>
    </section>
  );
}

export default Projects;
