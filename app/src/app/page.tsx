"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"), { ssr: false });
const FloatingOrbs = dynamic(() => import("@/components/FloatingOrbs"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("@/sections/Hero"), { ssr: false });
const Problem = dynamic(() => import("@/sections/Problem"), { ssr: false });
const Method = dynamic(() => import("@/sections/Method"), { ssr: false });
const Features = dynamic(() => import("@/sections/Features"), { ssr: false });
const Pricing = dynamic(() => import("@/sections/Pricing"), { ssr: false });
const Testimonials = dynamic(() => import("@/sections/Testimonials"), { ssr: false });
const FAQ = dynamic(() => import("@/sections/FAQ"), { ssr: false });
const FinalCTA = dynamic(() => import("@/sections/FinalCTA"), { ssr: false });
const Footer = dynamic(() => import("@/sections/Footer"), { ssr: false });
const CookieBanner = dynamic(
  () => import("@/sections/Footer").then((m) => ({ default: m.CookieBanner })),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    import("gsap").then((gsapModule) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsapModule.registerPlugin(ScrollTrigger);

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
      });
    });
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
