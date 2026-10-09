"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { Skill } from "../utils/interface";
import { SectionHeading } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { cn } from "../utils/cn";

interface SkillsProps {
  skills: Skill[];
}

/* Categories match the resume headings. */
const CATEGORIES: { title: string; match: string[]; blurb: string }[] = [
  {
    title: "Languages",
    match: ["Python", "Golang", "TypeScript"],
    blurb: "Python · Golang · TypeScript",
  },
  {
    title: "AI / GenAI",
    match: [
      "LLMs",
      "RAG",
      "Prompt Engineering",
      "LangGraph",
      "Hybrid Retrieval",
      "RAGAS",
      "Pydantic",
    ],
    blurb: "RAG · agents · evals · structured outputs",
  },
  {
    title: "Framework and tools",
    match: [
      "FastAPI",
      "Gin",
      "Django",
      "Node.js",
      "NestJS",
      "React",
      "Next.js",
    ],
    blurb: "FastAPI · Gin · Django · Node.js (NestJS) · React · Next.js",
  },
  {
    title: "Databases",
    match: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "pgvector"],
    blurb: "PostgreSQL · MongoDB · Redis · Qdrant · pgvector",
  },
  {
    title: "Cloud DevOps",
    match: [
      "AWS",
      "Docker",
      "GitLab CI/CD",
      "GitHub Actions",
      "Kubernetes",
      "Kafka",
    ],
    blurb:
      "AWS (EC2, ECS, ECR, S3, CloudWatch, SNS, SQS, EventBridge, Secrets Manager) · Docker · CI/CD · K8s · Kafka",
  },
  {
    title: "Observability",
    match: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Sentry"],
    blurb: "Prometheus · Grafana · Loki · OpenTelemetry · Sentry",
  },
  {
    title: "Architecture",
    match: [
      "System Design",
      "Microservices",
      "Event-Driven Architecture",
      "Distributed Systems",
      "API Gateway Design",
      "Agile",
    ],
    blurb:
      "System Design · Microservices · Event-Driven · Distributed Systems · API Gateways · Agile",
  },
];

function Skills({ skills }: SkillsProps) {
  const [active, setActive] = useState("All");
  const enabled = useMemo(() => skills.filter((s) => s.enabled), [skills]);

  const filtered =
    active === "All"
      ? enabled
      : enabled.filter((s) =>
          CATEGORIES.find((c) => c.title === active)?.match.includes(s.name)
        );

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading>
        <SlideIn className="text-sm uppercase tracking-[0.25em] text-primary">
          Skills
        </SlideIn>
        <SlideIn className="font-display mt-2 block text-3xl font-bold tracking-tight md:text-5xl">
          Backend, cloud & <span className="text-gradient">applied GenAI</span>
        </SlideIn>
      </SectionHeading>

      <Transition className="mt-6 flex flex-wrap gap-2">
        {["All", ...CATEGORIES.map((c) => c.title)].map((c) => (
          <motion.button
            key={c}
            onClick={() => setActive(c)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              active === c
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-foreground/10 bg-foreground/5 text-foreground/60 hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {c}
          </motion.button>
        ))}
      </Transition>

      {active === "All" ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const items = enabled.filter((s) => cat.match.includes(s.name));
            if (!items.length) return null;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="bento-card spotlight group h-full p-5"
                  onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const r = el.getBoundingClientRect();
                    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
                    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
                  }}
                >
                  <h3 className="font-display text-base font-bold text-foreground">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-foreground/50">
                    {cat.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((s, j) => (
                      <motion.span
                        key={s._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.04 }}
                        whileHover={{ scale: 1.06 }}
                        className="cursor-default rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[13px] text-foreground/80 transition hover:border-primary/40 hover:text-foreground"
                        title={
                          s.name === "Hybrid Retrieval"
                            ? "Hybrid Retrieval (BM25 + Embeddings)"
                            : s.name
                        }
                      >
                        {s.name}
                      </motion.span>
                    ))}
                  </div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${Math.round(
                          items.reduce((a, b) => a + b.percentage, 0) /
                            items.length
                        )}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <motion.div
              key={s._id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="bento-card spotlight p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{s.name}</span>
                <span className="text-sm text-primary">{s.percentage}%</span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.percentage}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Skills;
