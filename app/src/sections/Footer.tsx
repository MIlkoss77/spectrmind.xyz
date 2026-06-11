"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Academy", href: "#academy" },
    { label: "Neuro-Tracker", href: "#academy" },
    { label: "Meditations", href: "#academy" },
    { label: "Protocols", href: "#academy" },
    { label: "Decision Lab", href: "#academy" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Research", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Medical Disclaimer", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  const handleLinkClick = (href: string) => {
    if (href.startsWith("#") && href !== "#") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative pt-20 pb-8 px-6 border-t border-ash/10"
      style={{ zIndex: 2 }}
    >
      <div className="content-max-width mx-auto">
        {/* Top Row - 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl text-mist mb-2">
              SpectrMind
            </div>
            <p className="font-body text-xs text-ash leading-relaxed">
              Neuroscience for the curious.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-body text-xs text-mist uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="font-body text-xs text-ash hover:text-mist transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-px left-0 w-0 h-px bg-peridot-spark transition-all duration-300 group-hover:w-full" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-ash/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="font-body text-xs text-ash">
              &copy; 2026 SpectrMind. All rights reserved.
            </p>
            <p className="font-body text-xs text-ash/60 max-w-md text-right">
              SpectrMind is an educational platform. Content is for informational
              purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 bg-obsidian/95 backdrop-blur-xl border-t border-ash/10 px-6 py-3"
          style={{ zIndex: 200 }}
        >
          <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-ash text-center sm:text-left">
              We use cookies to optimize your neural experience.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVisible(false)}
                className="pill-button-primary h-8 px-4 text-xs"
              >
                Accept
              </button>
              <button
                onClick={() => setVisible(false)}
                className="pill-button-secondary h-8 px-4 text-xs"
              >
                Customize
              </button>
              <button
                onClick={() => setVisible(false)}
                className="p-1 text-ash hover:text-mist transition-colors sm:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
