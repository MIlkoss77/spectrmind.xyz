"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Academy", href: "#academy" },
  { label: "Method", href: "#method" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-obsidian/80 backdrop-blur-xl border-b border-ash/10"
            : "bg-transparent"
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="w-full max-w-content mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl text-mist hover:text-cyan-glow transition-colors"
          >
            SpectrMind
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-body text-ash hover:text-mist transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-glow transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => handleLinkClick("#pricing")}
              className="pill-button-primary h-9 text-sm px-5"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ash hover:text-mist transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-obsidian/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
            style={{ zIndex: 99 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleLinkClick(link.href)}
                className="text-2xl font-display text-mist hover:text-cyan-glow transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => handleLinkClick("#pricing")}
              className="pill-button-primary mt-4"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
