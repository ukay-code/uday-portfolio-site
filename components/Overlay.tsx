"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface OverlayProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export default function Overlay({ heroRef }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Keyframes are padded to span the full 0–1 range: framer-motion may promote
  // these to native ViewTimeline animations, where any unkeyframed range
  // interpolates back to the element's base opacity instead of holding.

  // PHASE 1 — Ghost watermark (0.00–0.28)
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.18, 0.28, 1],
    [1, 1, 1, 0, 0]
  );

  // PHASE 2 — Name intro block (0.28–0.52)
  const nameOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.38, 0.44, 0.52, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.28, 0.52, 1],
    [60, 60, -60, -60]
  );

  // PHASE 3 — Role statement (0.52–0.78)
  const roleOpacity = useTransform(
    scrollYProgress,
    [0, 0.52, 0.62, 0.7, 0.78, 1],
    [0, 0, 1, 1, 0, 0]
  );

  // PHASE 4 — Main headline (0.78–1.00)
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.78, 0.88, 0.96, 1.0],
    [0, 0, 1, 1, 0]
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* PHASE 1 — Ghost watermark (bottom-anchored so the face stays clear) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1.5rem",
          paddingBottom: "5vh",
          opacity: ghostOpacity,
          willChange: "opacity, transform",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(5rem, 15vw, 14rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "rgba(255, 255, 255, 0.10)",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          UK
        </h1>
        {/* Scroll cue: the hero is scroll-driven, so invite the first scroll */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60 md:text-sm">
            Always Up
          </p>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-[#acec00]"
            aria-hidden
          >
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* PHASE 2 — Name intro block (bottom-anchored so the face stays clear) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: "0 1.5rem 9vh",
          opacity: nameOpacity,
          y: nameY,
          willChange: "opacity, transform",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Udaya Kumar
          <span
            style={{
              display: "block",
              fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginTop: "0.5rem",
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            Sivagurunathan.
          </span>
        </h2>
        <p className="text-sm font-medium tracking-widest text-white/60 md:text-base">
          An Author · 13 Years in UX · Lead UX Designer
        </p>
      </motion.div>

      {/* PHASE 3 — Role statement (bottom-anchored so the face stays clear) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "0 1.5rem 12vh",
          opacity: roleOpacity,
          willChange: "opacity, transform",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {"UX AI Educator &\nLead UX Designer."}
        </h2>
      </motion.div>

      {/* PHASE 4 — Main headline (bottom-anchored so the face stays clear) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1.25rem",
          padding: "0 1.5rem 10vh",
          opacity: headlineOpacity,
          willChange: "opacity, transform",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {"Building Experience\nThat Lasts Forever."}
        </h2>
        <p className="text-sm font-medium tracking-widest text-white/60 md:text-base">
          Making India the design differentiator for the world
        </p>
      </motion.div>
    </div>
  );
}
