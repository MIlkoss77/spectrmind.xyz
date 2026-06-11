"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock, Shield, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { icon: Lock, label: "256-bit SSL" },
  { icon: Shield, label: "30-Day Guarantee" },
  { icon: Zap, label: "Instant Access" },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
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
            stagger: { each: 0.05, from: "start" },
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Badges animation
      if (badgesRef.current) {
        gsap.fromTo(
          badgesRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: badgesRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
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

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-6"
      style={{ zIndex: 2 }}
    >
      {/* Intensified gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(42, 10, 31, 0.5) 0%, rgba(10, 10, 15, 0.9) 60%, transparent 100%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center" style={{ zIndex: 2 }}>
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-5xl md:text-6xl text-mist mb-6"
        >
          {splitText("Your Brain Deserves an Upgrade")}
        </h2>

        {/* Subheadline */}
        <p className="font-body text-lg text-ash mb-10">
          Join 10,000+ cognitive pioneers already transforming their reality.
        </p>

        {/* Email Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          style={{ opacity: 0 }}
        >
          {submitted ? (
            <div className="pill-button-primary h-12 px-8 bg-peridot-spark text-obsidian font-medium">
              Welcome to the neural revolution! Check your inbox.
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 px-6 rounded-full bg-transparent border border-ash/30 text-mist placeholder:text-ash/50 font-body text-sm focus:outline-none focus:border-peridot-spark transition-colors min-w-[280px]"
              />
              <button type="submit" className="pill-button-primary h-12 px-8">
                Begin Transformation
              </button>
            </>
          )}
        </form>

        {/* Trust Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap justify-center gap-6 sm:gap-8"
          style={{ opacity: 0 }}
        >
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-peridot-spark/60" />
                <span className="font-body text-xs text-ash uppercase tracking-wider">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
