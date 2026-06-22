"use client";

import { useEffect } from "react";

import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingOrbs from "@/components/FloatingOrbs";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Problem from "@/sections/Problem";
import Method from "@/sections/Method";
import Features from "@/sections/Features";
import Pricing from "@/sections/Pricing";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Footer, { CookieBanner } from "@/sections/Footer";

export default function Home() {
  useEffect(() => {
    const gsap = require("gsap");
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          section.classList.add("visible");
        },
      });
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t: unknown) => {
        if (typeof t === "object" && t !== null && "kill" in t) {
          (t as { kill: () => void }).kill();
        }
      });
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-obsidian">
      {/* Layer 0: Animated Background (canvas eye) */}
      <AnimatedBackground />

      {/* Layer 1: Floating Gradient Orbs */}
      <FloatingOrbs />

      {/* Layer 2: Page Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <Hero />
        <Problem />
        <Method />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />

        {/* Cookie Banner */}
        <CookieBanner />
      </div>
    </main>
  );
}
