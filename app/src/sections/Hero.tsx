"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const tagRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tag animation
    gsap.fromTo(
      tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
    );

    // Headline character animation
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
          stagger: { each: 0.03, from: "center" },
          delay: 0.5,
        }
      );
    }

    // Subheadline
    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.0 }
    );

    // CTAs
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 1.2 }
    );

    // Trust bar
    gsap.fromTo(
      trustRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out", delay: 1.5 }
    );
  }, []);

  // Split text into characters
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ opacity: 0, filter: "blur(10px)" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative" style={{ zIndex: 2 }}>
        {/* Mono Tag */}
        <div
          ref={tagRef}
          className="mono-tag text-cyan-glow mb-8"
          style={{ opacity: 0 }}
        >
          NEURO-PROGRAMMING PROTOCOLS
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-hero text-mist mb-6"
        >
          <span className="block">{splitText("Upgrade Your Mind.")}</span>
          <span className="block text-cyan-glow">
            {splitText("Control Your Reality.")}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="font-body text-body-lg text-ash max-w-2xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          The 5 scientific protocols to bypass cortisol hijack, restore dopamine
          sensitivity, and reprogram your neural pathways for elite focus.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16" style={{ opacity: 0 }}>
          <button
            onClick={() => handleScrollTo("#pricing")}
            className="pill-button-primary h-12 px-8 text-base"
          >
            Get the SPECTRE Protocols
          </button>
          <button
            onClick={() => handleScrollTo("#problem")}
            className="pill-button-secondary h-12 px-8 text-base"
          >
            Learn More
          </button>
        </div>

        {/* Trust Bar */}
        <div ref={trustRef} className="flex flex-col items-center gap-4" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-8 opacity-40">
            {/* University/Research icons - minimal SVG */}
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-ash"
              >
                <rect
                  x="4"
                  y="12"
                  width="24"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M16 4L4 12H28L16 4Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <rect
                  x="12"
                  y="20"
                  width="8"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            ))}
          </div>
          <p className="text-xs font-body text-ash tracking-wide">
            Trusted by 10,000+ cognitive pioneers
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-ash/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-cyan-glow/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
