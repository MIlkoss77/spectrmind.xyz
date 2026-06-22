"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SuccessDownload() {
  const handleDownload = () => {
    // Path to the PDF guide (assuming placed in public folder as SPECTRE_Protocols_Guide.pdf or hosted)
    const link = document.createElement("a");
    link.href = "/SPECTRE_Protocols_Comprehensive_Guide.pdf";
    link.download = "SPECTRE_Protocols_Comprehensive_Guide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="relative min-h-screen bg-obsidian text-mist flex flex-col items-center justify-center px-6 py-12">
      {/* Background glow effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl w-full bg-deep-gray/80 border border-cyan-glow/20 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,255,255,0.05)] text-center"
      >
        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="mx-auto mb-6 w-16 h-16 bg-cyan-glow/10 rounded-full flex items-center justify-center text-cyan-glow"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-subsection text-mist mb-3">
          Payment Successful!
        </h1>
        <p className="font-body text-sm text-ash mb-8 max-w-sm mx-auto">
          Your transaction has been verified via Plisio. You now have complete access to the SPECTRE Neuroprogramming Protocols.
        </p>

        {/* Steps/Dashboard */}
        <div className="space-y-4 mb-8 text-left">
          {/* Step 1: Download Guide */}
          <div className="bg-obsidian/40 border border-ash/10 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-glow/10 rounded-lg text-cyan-glow">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-body text-sm font-semibold text-mist">
                  SPECTRE Protocols Guide
                </h3>
                <p className="font-body text-xs text-ash">
                  25-page comprehensive PDF guide
                </p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold bg-cyan-glow text-obsidian rounded-full hover:brightness-110 transition-all font-body uppercase tracking-wider"
            >
              Download
            </button>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-ash/40 font-body mb-6">
          <ShieldCheck className="w-4 h-4" />
          Life-time updates and active support included.
        </div>

        {/* Return Button */}
        <Link
          href="/"
          className="text-xs font-semibold font-body text-ash hover:text-cyan-glow transition-all uppercase tracking-wider"
        >
          Back to Home Page
        </Link>
      </motion.div>
    </main>
  );
}
