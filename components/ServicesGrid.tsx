"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

interface Service {
  index: string;
  title: string;
  description: string;
  background: string;
}

const SERVICES: Service[] = [
  {
    index: "01",
    title: "UI/UX Design",
    description:
      "Design that moves business metrics. Beyond pixels, built on UX thinking.",
    background: "#151515",
  },
  {
    index: "02",
    title: "Web Development",
    description: "Fast, modern websites. HTML/CSS/JS. Deployed on Vercel.",
    background: "#1a1a1a",
  },
  {
    index: "03",
    title: "UX Education",
    description:
      "Dravintel Academy for UX Thinking. Learn to think before you design.",
    background: "#1f1f1f",
  },
  {
    index: "04",
    title: "AI Automation",
    description: "Chatbots, n8n workflows, smart agents. 24/7 automation.",
    background: "#242424",
  },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

interface DeckCardProps {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function DeckCard({ service, index, total, progress }: DeckCardProps) {
  // Once this card is dealt, it eases back as the following cards stack on top.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  // Input range padded to the full 0–1 span so framer-motion's native
  // ViewTimeline promotion can't interpolate back to the base value.
  const scale = useTransform(
    progress,
    [0, index / total, 1],
    [1, 1, targetScale]
  );

  return (
    <div
      className="sticky top-0 flex h-screen items-center justify-center"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="relative flex w-[min(92%,900px)] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-8 md:p-14"
        style={{
          scale,
          top: `calc(-6vh + ${index * 26}px)`,
          height: "min(62vh, 560px)",
          backgroundColor: service.background,
          transformOrigin: "top center",
          willChange: "transform",
        }}
      >
        {/* Oversized ghost number */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-10 select-none text-white/[0.04]"
          style={{
            fontSize: "clamp(10rem, 24vw, 20rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          {service.index}
        </span>

        <p
          className="text-sm font-semibold tracking-[0.3em] text-[#acec00]"
          style={{ fontWeight: 700 }}
        >
          {service.index}
        </p>

        <div>
          <h3
            className="text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {service.title}
          </h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-400 md:text-lg">
            {service.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesGrid() {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="relative z-20 bg-[#0d0d0d]">
      <motion.div
        className="mx-auto max-w-7xl px-6 pb-4 pt-24 md:px-12 md:pt-32"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        style={{ willChange: "opacity, transform" }}
      >
        <h2
          className="text-4xl text-white md:text-5xl"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          What I Do
        </h2>
        <p className="mt-4 text-neutral-500">
          Four ways I can help you build, learn, and grow.
        </p>
      </motion.div>

      <div ref={deckRef} className="relative">
        {SERVICES.map((service, index) => (
          <DeckCard
            key={service.title}
            service={service}
            index={index}
            total={SERVICES.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
