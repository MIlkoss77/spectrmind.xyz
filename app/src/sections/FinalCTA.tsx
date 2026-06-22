"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock, Shield, Zap, Download, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8u4Z4XiGgG9DfhLiJxOIadgXUxACTGm3paNp5OQ9OgkBn9H-aX4MOHiqZiAZ1HF_PzQ/exec';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            <div className="flex flex-col items-center gap-4">
              <div className="pill-button-primary h-12 px-8 bg-peridot-spark text-obsidian font-medium">
                Your guide is ready!
              </div>
              <a
                href="/SPECTRE_Protocols_Comprehensive_Guide.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-peridot-spark/50 text-peridot-spark font-medium rounded-full hover:bg-peridot-spark/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Free Guide
              </a>
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
              <button
                type="submit"
                disabled={loading}
                className="pill-button-primary h-12 px-8 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Begin Transformation"
                )}
              </button>
            </>
          )}
        </form>

        {error && (
          <p className="text-sm text-red-400 mb-4">{error}</p>
        )}

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
