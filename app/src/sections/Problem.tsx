"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Route, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: Zap,
    title: "Dopamine Overload",
    description:
      "Endless notifications and instant gratification rewire your brain for distraction, destroying deep focus.",
  },
  {
    icon: Route,
    title: "Decision Fatigue",
    description:
      "Your brain processes 35,000 decisions daily. Each one depletes the mental energy you need for what matters.",
  },
  {
    icon: Activity,
    title: "Cortisol Hijack",
    description:
      "Chronic stress floods your system with cortisol, blocking the prefrontal cortex responsible for clear thinking.",
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title wave blur animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { opacity: 0, filter: "blur(10px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
            stagger: { each: 0.04, from: "random" },
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".pain-card");
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Stat pill pop animation
      if (pillRef.current) {
        gsap.fromTo(
          pillRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: pillRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="section-padding relative"
      style={{ zIndex: 2 }}
    >
      <div className="content-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-start">
          {/* Left Column - Text & Cards */}
          <div>
            <div className="mono-tag text-cyan-glow mb-4">THE CORE CRISIS</div>
            <h2
              ref={titleRef}
              className="font-display text-section text-mist mb-12"
            >
              {splitText("Your Prefrontal Cortex Is Overwhelmed")}
            </h2>

            <div ref={cardsRef} className="space-y-6">
              {painPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    className="pain-card relative bg-deep-gray/60 border border-ash/10 rounded-xl p-6 pl-8 transition-all duration-300 hover:border-cyan-glow/30 hover:-translate-y-1"
                    style={{ opacity: 0 }}
                  >
                    {/* Left border accent */}
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-cyan-glow rounded-full" />

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-cyan-glow/10 rounded-lg">
                        <Icon className="w-5 h-5 text-cyan-glow" />
                      </div>
                      <div>
                        <h3 className="font-body text-lg font-medium text-mist mb-1">
                          {point.title}
                        </h3>
                        <p className="font-body text-sm text-ash leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[500px]">
            {/* Abstract brain visualization */}
            <div className="relative">
              <svg
                viewBox="0 0 300 300"
                className="w-72 h-72"
                fill="none"
              >
                {/* Outer ring */}
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  stroke="rgba(0, 255, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Inner ring */}
                <circle
                  cx="150"
                  cy="150"
                  r="80"
                  stroke="rgba(0, 128, 255, 0.15)"
                  strokeWidth="1"
                />
                {/* Center glow */}
                <circle cx="150" cy="150" r="40" fill="url(#brainGrad)" />
                {/* Neural connections */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 150 + Math.cos(rad) * 40;
                  const y1 = 150 + Math.sin(rad) * 40;
                  const x2 = 150 + Math.cos(rad) * 100;
                  const y2 = 150 + Math.sin(rad) * 100;
                  return (
                    <line
                      key={angle}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(0, 255, 255, 0.2)"
                      strokeWidth="1"
                    />
                  );
                })}
                {/* Nodes */}
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 150 + Math.cos(rad) * 100;
                  const y = 150 + Math.sin(rad) * 100;
                  return (
                    <circle
                      key={angle}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#00FFFF"
                      opacity="0.6"
                    />
                  );
                })}
                <defs>
                  <radialGradient id="brainGrad">
                    <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)" />
                    <stop offset="100%" stopColor="rgba(0, 128, 255, 0.1)" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Floating stat pill */}
              <div
                ref={pillRef}
                className="absolute -right-4 top-1/3 bg-deep-gray/90 border border-cyan-glow/30 rounded-full px-4 py-2"
                style={{ opacity: 0 }}
              >
                <span className="font-mono text-xs text-cyan-glow uppercase tracking-wide">
                  35,000 decisions per day
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
