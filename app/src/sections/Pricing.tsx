"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ShieldCheck, Clock, Flame, CreditCard } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8u4Z4XiGgG9DfhLiJxOIadgXUxACTGm3paNp5OQ9OgkBn9H-aX4MOHiqZiAZ1HF_PzQ/exec';

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // FOMO Countdown Timer (15 minutes)
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins in seconds
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [pricingEmail, setPricingEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

      // Single card slide up
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCheckout = () => {
    setIsCheckoutLoading(true);
    // Simulate Plisio API checkout creation, then redirect to successful hidden route
    setTimeout(() => {
      router.push("/success-download");
    }, 2000);
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

  const features = [
    "Protocol #1: Advanced Peptide Cycling (Semax, Cerebrolysin, BPC-157, P21)",
    "Protocol #2: Dopamine Detox 2.0 (The Huberman-inspired 7-Day Reset)",
    "Protocol #3: Decision Matrix Flow (Bypass cortisol & make apex decisions)",
    "Protocol #4: Sleep Architecture (Optimal light, noise, REM stack guide)",
    "Protocol #5: NLP & Affirmation Engineering (Bridging affirmations framework)",
    "BONUS: Free lifetime access to the digital PWA Neurotracker app",
    "BONUS: Free access to the institutional Trading Terminal to test your upgraded brain",
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-padding relative"
      style={{ zIndex: 2 }}
    >
      <div className="content-max-width mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono-tag text-cyan-glow mb-4">LIMITED TIME OFFER</div>
          <h2
            ref={titleRef}
            className="font-display text-section text-mist"
          >
            {splitText("Acquire The Edge")}
          </h2>
        </div>

        {/* Urgency/FOMO Banner */}
        <div className="max-w-2xl mx-auto mb-8 bg-cyan-glow/5 border border-cyan-glow/20 rounded-full py-3 px-6 flex items-center justify-center gap-3 animate-pulse">
          <Flame className="w-5 h-5 text-cyan-glow" />
          <span className="font-body text-xs md:text-sm text-cyan-glow font-semibold uppercase tracking-wider flex items-center gap-2">
            Special Promo Code Applied! Price expires in:
            <span className="font-mono text-base ml-1 bg-cyan-glow/20 px-2 py-0.5 rounded text-white font-bold">
              {formatTime(timeLeft)}
            </span>
          </span>
        </div>

        {/* Central Pricing Card */}
        <div
          ref={cardRef}
          className="pricing-card relative max-w-2xl mx-auto rounded-3xl p-8 md:p-10 bg-deep-gray/80 border border-cyan-glow/30 shadow-[0_0_50px_rgba(0,255,255,0.05)] glow-border"
          style={{ opacity: 0 }}
        >
          {/* Popular Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="mono-tag bg-obsidian text-cyan-glow border border-cyan-glow/40 px-4 py-1.5 rounded-full text-[10px] tracking-widest font-black">
              FULL ACCESS
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-ash/10 pb-8">
            <div>
              <h3 className="font-display text-subsection text-mist mb-2">
                SPECTRE Protocols
              </h3>
              <p className="font-body text-sm text-ash">
                The Comprehensive Human Neuroprogramming System
              </p>
            </div>
            
            {/* Price section showing FREE */}
            <div className="text-left md:text-right shrink-0">
              <div className="flex items-center gap-3 md:justify-end">
                <span className="font-body text-base text-ash/40 line-through">
                  $39
                </span>
                <span className="font-mono text-xs text-cyan-glow bg-cyan-glow/10 px-2.5 py-0.5 rounded-full font-bold">
                  FREE ACCESS
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 md:justify-end">
                <span className="font-display text-6xl text-mist font-bold">
                  $0
                </span>
                <span className="font-body text-xs text-ash">instant download</span>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <ul className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3.5 text-sm"
              >
                <div className="p-0.5 bg-cyan-glow/10 rounded-full mt-0.5">
                  <Check className="w-3.5 h-3.5 text-cyan-glow flex-shrink-0" />
                </div>
                <span className="font-body text-ash leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA & ConvertKit Form */}
          <div className="space-y-4">
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!pricingEmail) return;
                setIsCheckoutLoading(true);
                try {
                  await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: pricingEmail }),
                  });
                } catch {}
                setTimeout(() => {
                  setIsCheckoutLoading(false);
                  router.push("/success-download");
                }, 1500);
              }}
              className="flex flex-col gap-3"
            >
              <input 
                type="email" 
                value={pricingEmail}
                onChange={(e) => setPricingEmail(e.target.value)}
                placeholder="Enter your primary email"
                required
                className="w-full h-14 px-5 rounded-full bg-black/40 border border-cyan-glow/30 text-white placeholder-ash/50 focus:border-cyan-glow outline-none transition-all font-body text-sm text-center"
              />
              <button
                type="submit"
                disabled={isCheckoutLoading}
                className="w-full pill-button-primary h-14 text-base font-bold tracking-wider uppercase flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isCheckoutLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                    Connecting to SECURE NODES...
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    Get Free Protocols & App Access
                  </>
                )}
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 text-xs text-ash/40 font-body">
              <ShieldCheck className="w-4 h-4" />
              We respect your privacy. No spam, unsubscribe anytime.
            </div>
          </div>
        </div>

        {/* Moneyback guarantee */}
        <div className="text-center mt-12">
          <p className="font-body text-xs text-ash/40 max-w-sm mx-auto leading-relaxed">
            * 30-Day Cognitive Guarantee. If you do not feel a significant upgrade in focus and clarity, contact us for a 100% refund.
          </p>
        </div>
      </div>
    </section>
  );
}
