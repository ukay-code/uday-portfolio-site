"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photo: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I know Uday as a curious person who always wanted to explore the depth in design, connecting from nature and learning design and exploring the possibilities to provide best experience in building products. Someone who never settles down with ordinary thoughts. Wish him a fantastic journey in design.",
    name: "Kingsley S",
    role: "Founder, OctaKidz · UXMINT LLP · Visiting Faculty for Design at IIFC",
    photo: "/Testimonial/kingsley.jpeg",
  },
  {
    quote:
      "Bold, energetic, brilliant speaker, thinker, challenger, trustworthy. Still remember his campus interview: out of the entire class he is the only guy who spoke and questioned us. Guess what happened after that... we hired him.",
    name: "Thulasiram L",
    role: "Experience Design",
    photo: "/Testimonial/Thulasiram.jpeg",
  },
  {
    quote:
      "Udaya's creative thinking, expertise and positive attitude as an Interaction Designer made him an absolute pleasure to work with. He continually delivered results, excelled in providing exceptional usability solutions and showed genuine integrity as a team member. I would highly recommend him!",
    name: "Saravanan NC",
    role: "Product Design · User Experience at Publicis Sapient · Design Systems",
    photo: "/Testimonial/Saravanan NC.jpeg",
  },
];

const AUTO_ADVANCE_MS = 6000;
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

const quoteVariants: Variants = {
  enter: { opacity: 0, y: 32, scale: 0.99 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -24,
    scale: 0.99,
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = TESTIMONIALS[index];

  const goTo = useCallback((target: number) => {
    setIndex((target + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Rotate slowly enough to read; restart after any change, pause on hover.
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, index]);

  return (
    <section
      id="testimonials"
      className="relative z-20 bg-[#0d0d0d] py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="text-center"
          style={{ willChange: "opacity, transform" }}
        >
          <h2
            className="text-4xl text-white md:text-5xl"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            Testimonials
          </h2>
          <p className="mt-4 text-neutral-500">
            What colleagues and leaders say about working with me.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Spotlight quote */}
          <div className="relative mx-auto flex min-h-[320px] max-w-3xl flex-col items-center justify-center md:min-h-[280px]">
            <span
              aria-hidden
              className="absolute -top-2 left-0 select-none text-7xl leading-none text-[#acec00]/80 md:-left-8 md:text-8xl"
              style={{ fontWeight: 800 }}
            >
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.name}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ willChange: "opacity, transform" }}
              >
                <blockquote className="text-base leading-relaxed text-neutral-200 md:text-xl md:leading-relaxed">
                  {active.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <p
                    className="text-lg text-white"
                    style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
                  >
                    {active.name}
                  </p>
                  <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">
                    {active.role}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Avatar selector */}
          <div className="mt-10 flex items-center justify-center gap-5 md:gap-7">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial from ${t.name}`}
                className={`group relative rounded-full transition-all duration-500 ${
                  i === index
                    ? "scale-110 ring-2 ring-[#acec00] ring-offset-4 ring-offset-[#0d0d0d]"
                    : "opacity-50 hover:opacity-90"
                }`}
              >
                <span className="block h-14 w-14 overflow-hidden rounded-full md:h-16 md:w-16">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={64}
                    height={64}
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      i === index ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
