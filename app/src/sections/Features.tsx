"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dna,
  Zap,
  CheckSquare,
  Moon,
  Compass,
  Laptop
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Dna,
    title: "01. Peptide Cycling Protocol",
    description:
      "Exact visual cycles for Semax, Cerebrolysin, BPC-157, Selank, and P21 to safely stimulate BDNF, NGF, and neuroplasticity without receptor downregulation.",
    tall: true,
  },
  {
    icon: Zap,
    title: "02. Dopamine Detox 2.0",
    description:
      "A strict 7-day science-backed sequence (Crash, Clarity, Flow, Reintegration) to restore D1 & D2 dopamine receptor sensitivity and clear brain fog.",
    tall: false,
  },
  {
    icon: Compass,
    title: "03. Decision Matrix Flow",
    description:
      "Bypass the 'cortisol hijack' of your amygdala. A robust 6-step cognitive framework (10/10/10 rule) to take high-stakes, emotionless decisions.",
    tall: false,
  },
  {
    icon: Moon,
    title: "04. Sleep Architecture",
    description:
      "Optimize deep and REM sleep. Master temperature, noise, and light conditions while leveraging the Magnesium Glycinate, L-Theanine, and Apigenin Sleep Stack.",
    tall: true,
  },
  {
    icon: CheckSquare,
    title: "05. NLP & Affirmation Engineering",
    description:
      "Rewrite your subconscious programming. Utilize Hebbian learning ('neurons that fire together wire together') and custom 'bridge affirmations'.",
    tall: false,
  },
  {
    icon: Laptop,
    title: "BONUS. PWA Neurotracker Access",
    description:
      "Stop wasting time with Notion templates. Get exclusive, lifetime access to our digital PWA app to track all 5 protocols, build habits, and unlock trading terminal bonuses.",
    tall: true,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid cards stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".feature-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="academy"
      className="section-padding relative"
      style={{ zIndex: 2 }}
    >
      <div className="content-max-width mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mono-tag text-cyan-glow mb-4">THE SPECTRE SYSTEM</div>
          <h2
            ref={titleRef}
            className="font-display text-section text-mist"
          >
            {splitText("5 Scientific Protocols For Reality Control")}
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`feature-card group bg-deep-gray/60 border border-ash/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/30 ${
                  feature.tall ? "md:row-span-2" : ""
                }`}
                style={{ opacity: 0 }}
              >
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-cyan-glow/10 rounded-xl w-fit mb-4 group-hover:bg-cyan-glow/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-glow" />
                  </div>

                  <h3 className="font-body text-lg font-medium text-mist mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-ash leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Decorative corner accent */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-ash/50 group-hover:text-cyan-glow/60 transition-colors">
                    <span>Protocol parameters</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="transform group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M2 6H10M10 6L7 3M10 6L7 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
