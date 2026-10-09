"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "motion/react";

import { About as IAbout, Timeline } from "../utils/interface";
import { OpacityTextReveal, SlideIn, Transition } from "./ui/Transitions";

interface AboutProps {
  about: IAbout;
  timeline: Timeline[];
}

const About = ({ about, timeline }: AboutProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section
      className="mx-auto grid max-w-6xl gap-x-10 px-4 py-16 md:grid-cols-[1.8fr_1fr] md:px-6 md:py-24"
      id="about"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-foreground/60"
        >
          About · Experience · Education
        </motion.div>
        <h3 className="md:text-5xl text-2xl font-bold overflow-hidden uppercase pb-8">
          <SlideIn>
            <OpacityTextReveal>{about.quote}</OpacityTextReveal>
          </SlideIn>
        </h3>
        <Transition
          viewport={{ once: true }}
          className="md:text-4xl tracking-tighter"
        >
          <OpacityTextReveal>{about.description}</OpacityTextReveal>
        </Transition>
        <div className="pt-10">
          <div className="py-10 overflow-hidden grid w-full">
            {education.map((edu, index) => (
              <Transition key={edu._id}>
                <TimelineCard
                  index={index}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  timeline={edu}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="sticky top-24">
          <Transition>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/25 to-cyan-500/10 blur-xl" />
              <img
                src={about.avatar.url}
                width={400}
                height={400}
                alt={about.name}
                className="relative aspect-square w-full rounded-[2rem] border border-foreground/10 object-cover shadow-card"
                style={{ }}
              />
            </div>
          </Transition>
          <Transition className="bento-card spotlight mt-4 p-4">
            <p className="text-xs uppercase tracking-widest text-foreground/50">Experience</p>
            <p className="font-display mt-1 text-lg font-bold text-foreground">{about.exp_year}+ years · Backend, Cloud & GenAI</p>
            <p className="mt-1 text-sm text-foreground/60">{about.address} · {about.phoneNumber}</p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-3 rounded-xl border border-primary/25 bg-primary/10 p-3"
            >
              <p className="text-xs uppercase tracking-widest text-primary">Achievement</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Transformer of the Year (2024)</p>
              <p className="text-xs text-foreground/60">DOT Compliance Group, backend automation and DevOps optimization</p>
            </motion.div>
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default About;

interface TimelineCardProps {
  timeline: Timeline;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  index: number;
}

const TimelineCard = ({
  timeline,
  activeIndex,
  setActiveIndex,
  index,
}: TimelineCardProps) => (
  <motion.section
    id="about"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay: index * 0.05 }}
    whileHover={{ y: -3 }}
    className="bento-card spotlight mb-3 p-5"
  >
    <div
      className="flex items-center justify-between gap-4 cursor-pointer select-none"
      onClick={() => setActiveIndex(index)}
    >
      <span>0{index + 1}</span>
      <span className="text-xl md:text-3xl font-bold flex-1">
        {timeline.jobTitle}
      </span>
      <div className="relative size-6 flex items-center justify-center">
        <span className="bg-primary w-4 md:w-6 h-0.5 absolute" />
        <motion.span
          initial={{ rotate: 90 }}
          animate={{
            rotate: activeIndex === index ? 0 : 90,
          }}
          className="absolute bg-primary w-4 md:w-6 h-0.5 rotate-90"
        />
      </div>
    </div>
    <motion.div
      initial={false}
      animate={{
        height: activeIndex === index ? "auto" : 0,
        opacity: activeIndex === index ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <p className="text-foreground/60 py-4 max-md:text-sm">
        {timeline.summary}
      </p>
      <div className="flex justify-between items-center pb-3 text-foreground/80">
        <div className="max-md:text-sm">
          <span>{timeline.company_name}</span>
          <span>{timeline.jobLocation}</span>
        </div>
        <div className="max-md:text-xs">
          <span className="italic">
            {timeline.startDate}
          </span>
          {" - "}
          <span className="italic">
          {timeline.endDate}
          </span>
        </div>
      </div>
      <ul className="list-disc list-inside">
        {timeline.bulletPoints.map((point, index) => (
          <li key={index} className="text-foreground/80 max-md:text-sm">
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  </motion.section>
);
