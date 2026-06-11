"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Brain, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    number: "01",
    title: "Neural Foundation",
    description:
      "Reset your dopamine receptors through evidence-based biohacking, peptide protocols, and nutritional optimization. Rebuild the biological substrate of peak cognition.",
    icon: FlaskConical,
    color: "#8B5CF6",
    details: [
      "Dopamine receptor recovery protocols",
      "Peptide stacking for neurogenesis",
      "Circadian rhythm optimization",
      "Nutritional ketosis cycles",
    ],
  },
  {
    number: "02",
    title: "Reality Programming",
    description:
      "Rewire your neural pathways using NLP, precision affirmations, and cortisol management. Enter flow states on demand and reprogram limiting beliefs.",
    icon: Brain,
    color: "#A3E635",
    details: [
      "NLP pattern interrupts",
      "Cortisol regulation techniques",
      "Flow state induction protocols",
      "Subconscious belief reprogramming",
    ],
  },
  {
    number: "03",
    title: "Clarity Integration",
    description:
      "Install decision-making frameworks and information hygiene systems. Eliminate cognitive clutter and operate with crystal-clear mental focus.",
    icon: Target,
    color: "#F3F4F6",
    details: [
      "Decision matrix frameworks",
      "Information diet protocols",
      "Attention management systems",
      "Weekly neural optimization reviews",
    ],
  },
];

export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Timeline line draw animation
      const line = timelineRef.current?.querySelector(".timeline-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Phase cards stagger
      const cards = timelineRef.current?.querySelectorAll(".phase-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
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
      id="method"
      className="section-padding relative"
      style={{ zIndex: 2 }}
    >
      <div className="content-max-width mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mono-tag text-peridot-spark mb-4">THE PROTOCOL</div>
          <h2
            ref={titleRef}
            className="font-display text-section text-mist"
          >
            {splitText("A 3-Phase Neural Reset")}
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px">
            <div
              className="timeline-line h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, #8B5CF6, #A3E635)",
              }}
            />
          </div>

          {/* Phase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = activePhase === index;

              return (
                <div
                  key={phase.number}
                  className="phase-card relative"
                  style={{ opacity: 0 }}
                >
                  {/* Number node on timeline */}
                  <div className="hidden lg:flex justify-center mb-8">
                    <div
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer"
                      style={{
                        borderColor: phase.color,
                        backgroundColor: isActive
                          ? phase.color
                          : "rgba(10, 10, 15, 0.9)",
                        boxShadow: isActive
                          ? `0 0 20px ${phase.color}40`
                          : "none",
                      }}
                      onClick={() =>
                        setActivePhase(isActive ? null : index)
                      }
                    >
                      <span
                        className="font-mono text-sm font-bold"
                        style={{
                          color: isActive ? "#0A0A0F" : phase.color,
                        }}
                      >
                        {phase.number}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div
                    className="bg-void-plum/40 border border-ash/10 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-orchid-glow/30"
                    onClick={() => setActivePhase(isActive ? null : index)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${phase.color}15` }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: phase.color }}
                        />
                      </div>
                      <span
                        className="font-mono text-2xl font-bold lg:hidden"
                        style={{ color: phase.color }}
                      >
                        {phase.number}
                      </span>
                    </div>

                    <h3 className="font-body text-xl font-medium text-mist mb-3">
                      {phase.title}
                    </h3>
                    <p className="font-body text-sm text-ash leading-relaxed mb-4">
                      {phase.description}
                    </p>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 pt-4 border-t border-ash/10">
                            {phase.details.map((detail) => (
                              <li
                                key={detail}
                                className="flex items-center gap-2 text-sm text-ash"
                              >
                                <span
                                  className="w-1 h-1 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: phase.color }}
                                />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isActive && (
                      <div className="text-xs text-ash/60 mt-2">
                        Click to expand
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
