"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

interface Social {
  platform: string;
  handle: string;
  action: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIALS: Social[] = [
  {
    platform: "LinkedIn",
    handle: "Udaya Kumar Sivagurunathan",
    action: "Connect",
    href: "https://www.linkedin.com/in/udaya-kumar-sivagurunathan-a9593148/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    platform: "YouTube",
    handle: "@DravintelUX",
    action: "Subscribe",
    href: "https://www.youtube.com/@DravintelUX/videos",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
      </svg>
    ),
  },
  {
    platform: "Instagram",
    handle: "@uk_on_ux",
    action: "Follow",
    href: "https://www.instagram.com/uk_on_ux/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.48 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.15a4 4 0 1 1 0-7.99 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
      </svg>
    ),
  },
];

const HEADLINE_WORDS = ["Building", "experience", "that", "lasts", "forever."];

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "60%", rotate: 3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/** Card that tilts toward the cursor with a lime spotlight following it. */
function TiltCard({ social }: { social: Social }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const tiltX = useSpring(useMotionValue(0), { stiffness: 250, damping: 22 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 250, damping: 22 });
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${spotX}% ${spotY}%, rgba(172, 236, 0, 0.16), transparent 70%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    tiltY.set((px - 0.5) * 16);
    tiltX.set((0.5 - py) * 16);
    spotX.set(px * 100);
    spotY.set(py * 100);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div variants={itemVariants} style={{ perspective: "900px" }}>
      <motion.a
        ref={cardRef}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#161616] px-6 py-10 transition-colors duration-300 hover:border-[#acec00]/50"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Cursor spotlight */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <span
          className="text-neutral-300 transition-all duration-300 group-hover:scale-110 group-hover:text-[#acec00]"
          style={{ transform: "translateZ(40px)" }}
        >
          {social.icon}
        </span>
        <span
          className="text-xl text-white"
          style={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            transform: "translateZ(30px)",
          }}
        >
          {social.platform}
        </span>
        <span
          className="text-sm text-neutral-500 transition-colors duration-300 group-hover:text-neutral-300"
          style={{ transform: "translateZ(20px)" }}
        >
          {social.handle}
        </span>

        {/* Action reveal */}
        <span
          className="mt-2 flex items-center gap-2 text-sm text-[#acec00] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2"
          style={{ fontWeight: 700, transform: "translateZ(30px)" }}
        >
          {social.action}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </motion.a>
    </motion.div>
  );
}

export default function Connect() {
  return (
    <section
      id="connect"
      className="relative z-20 overflow-hidden bg-[#0d0d0d] py-24 md:py-32"
    >
      {/* Ambient pulsing glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#acec00] blur-[160px]"
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting ghost watermark */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 select-none whitespace-nowrap text-white/[0.03]"
        style={{
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          lineHeight: 1,
        }}
        animate={{ x: ["-52%", "-48%", "-52%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        CONNECT
      </motion.span>

      <motion.div
        className="relative mx-auto max-w-5xl px-6 text-center md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.p
          variants={itemVariants}
          className="flex items-center justify-center gap-3 text-sm font-semibold tracking-[0.3em] text-[#acec00]"
        >
          <motion.span
            aria-hidden
            className="h-2 w-2 rounded-full bg-[#acec00]"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          LET&apos;S CONNECT
        </motion.p>

        {/* Kinetic headline: words rise one by one */}
        <h2
          className="mt-6 text-4xl text-white md:text-6xl"
          style={{ fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          {HEADLINE_WORDS.map((word) => (
            <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-xl text-neutral-400 md:text-lg"
        >
          Follow the journey: UX thinking, agentic AI, and design for India,
          shared as I build it.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6">
          {SOCIALS.map((social) => (
            <TiltCard key={social.platform} social={social} />
          ))}
        </div>

        <motion.p variants={itemVariants} className="mt-12 text-neutral-500">
          Prefer email?{" "}
          <a
            href="mailto:dravintel@gmail.com"
            className="text-neutral-300 underline decoration-[#acec00]/60 underline-offset-4 transition-colors duration-300 hover:text-[#acec00]"
          >
            dravintel@gmail.com
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
