"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { About } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";

interface HeroProps {
  about: About;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = ({ about }: HeroProps) => {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="grid-bg absolute inset-0 -z-10" />
      <motion.div
        aria-hidden
        className="absolute -top-32 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-40 -left-32 -z-10 size-96 rounded-full bg-cyan-500/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -24, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 -right-24 -z-10 size-80 rounded-full bg-primary/10 blur-[110px]"
        animate={{ x: [0, -32, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]"
        >
          <div>
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                {about.address} · Software Engineer
              </div>
            </motion.div>

            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              <SlideIn>{about.name}</SlideIn>
              <span className="text-gradient animate-gradient block bg-[length:200%_auto] pb-1">
                <SlideIn>{about.title}</SlideIn>
              </span>
            </h1>

            <motion.div variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              <p>{about.subTitle}</p>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#projects"
                  className="block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
                >
                  View selected work
                </Link>
              </motion.span>
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="block rounded-full border border-foreground/15 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-primary/40 hover:text-primary"
                >
                  Let&apos;s talk →
                </Link>
              </motion.span>
              <Link
                href="https://github.com/SachinMaurya01"
                target="_blank"
                className="rounded-full px-4 py-3 text-sm text-foreground/60 underline-offset-4 transition hover:text-foreground hover:underline"
              >
                GitHub ↗
              </Link>
              <Link
                href="https://www.linkedin.com/in/sachin-maurya-01/"
                target="_blank"
                className="rounded-full px-2 py-3 text-sm text-foreground/60 underline-offset-4 transition hover:text-foreground hover:underline"
              >
                LinkedIn ↗
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-9 grid max-w-lg grid-cols-3 gap-3">
              {[
                { k: `${about.exp_year}+ yrs`, v: "Experience" },
                { k: "3", v: "Companies" },
                { k: "15+", v: "Production projects" },
              ].map((s, i) => (
                <motion.div
                  key={s.v}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bento-card spotlight rounded-2xl p-3.5 text-center"
                >
                  <div className="font-display text-xl font-bold text-foreground md:text-2xl">
                    {s.k}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-foreground/50 md:text-xs">
                    {s.v}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="justify-self-center md:justify-self-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 via-cyan-500/20 to-transparent blur-2xl" />
              <img
                src={about.avatar.url}
                alt={about.name}
                className="relative size-56 rounded-[2rem] border border-foreground/15 object-cover shadow-card md:size-72"
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass absolute -bottom-4 -left-4 rounded-2xl border border-foreground/10 px-4 py-2.5 shadow-card"
              >
                <p className="text-xs text-foreground/60">Software Engineer</p>
                <p className="text-sm font-semibold text-foreground">
                  AI · Backend · DevOps
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <Transition className="mt-12 overflow-hidden border-t border-foreground/10 py-6">
          <div className="animate-marquee flex w-max items-center gap-2 text-xs text-foreground/50 md:w-full md:flex-wrap">
            <span className="mr-2 shrink-0 uppercase tracking-widest">Core:</span>
            {[
              "Python",
              "Golang",
              "TypeScript",
              "RAG",
              "LangGraph",
              "FastAPI",
              "Gin",
              "Next.js",
              "PostgreSQL",
              "pgvector",
              "Redis",
              "AWS",
              "Docker",
              "Kafka",
              "Prometheus",
              "Grafana",
            ].map((t) => (
              <span
                key={t}
                className="shrink-0 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-foreground/70 transition hover:border-primary/40 hover:text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Transition>
      </div>
    </section>
  );
};

export default Hero;
