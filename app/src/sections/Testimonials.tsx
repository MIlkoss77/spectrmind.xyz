"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "My focus went from scattered to laser-sharp in three weeks. The dopamine reset protocol alone was worth the investment in myself.",
    initials: "MK",
    name: "Michael K.",
    title: "Entrepreneur, Austin TX",
  },
  {
    quote:
      "I went from 200+ distracted thoughts per day to sustained 4-hour flow states. This is legitimate neuroscience made accessible for everyone.",
    initials: "JR",
    name: "Jessica R.",
    title: "Software Engineer, San Francisco",
  },
  {
    quote:
      "As a researcher, I was skeptical. But the peptide protocols and meditation tracks are grounded in real science. My HRV improved 23% in six weeks.",
    initials: "SL",
    name: "Dr. Sarah L.",
    title: "Neuroscientist, Boston",
  },
  {
    quote:
      "The Decision Lab changed how I process information. I'm calmer, sharper, and finally in control of my mental energy throughout the day.",
    initials: "AT",
    name: "Alex T.",
    title: "Creative Director, New York",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

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

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div className="content-max-width mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono-tag text-orchid-glow mb-4">
            TRANSFORMATIONS
          </div>
          <h2
            ref={titleRef}
            className="font-display text-section text-mist"
          >
            {splitText("Real Minds, Real Results")}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Cards Container */}
          <div className="relative h-80 md:h-64 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div className="bg-void-plum/40 border border-ash/10 rounded-2xl p-8 h-full flex flex-col justify-center">
                  <Quote className="w-8 h-8 text-peridot-spark/30 mb-4" />
                  <p className="font-body text-lg md:text-xl text-mist font-light italic leading-relaxed mb-6">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orchid-glow to-peridot-spark flex items-center justify-center">
                      <span className="font-mono text-xs font-bold text-obsidian">
                        {testimonials[currentIndex].initials}
                      </span>
                    </div>
                    <div>
                      <div className="font-body text-sm text-mist">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="font-body text-xs text-ash">
                        {testimonials[currentIndex].title}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-ash/20 flex items-center justify-center text-ash hover:border-peridot-spark hover:text-peridot-spark transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-peridot-spark"
                      : "bg-ash/30 hover:bg-ash/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full border border-ash/20 flex items-center justify-center text-ash hover:border-peridot-spark hover:text-peridot-spark transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
