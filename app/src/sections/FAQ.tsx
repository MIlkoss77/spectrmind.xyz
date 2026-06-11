"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What exactly is neuro-optimization?",
    answer:
      "Neuro-optimization is the systematic improvement of cognitive function through evidence-based protocols combining nutrition, meditation, supplementation, and behavioral science. It's about upgrading your brain's hardware and software to operate at peak performance.",
  },
  {
    question: "Do I need a science background to benefit?",
    answer:
      "Not at all. SpectrMind is designed for curious minds from all backgrounds. We translate complex neuroscience into actionable protocols that anyone can follow. Our community includes artists, engineers, parents, and executives—all united by a desire to think clearer.",
  },
  {
    question: "How long until I notice results?",
    answer:
      "Most members report improved focus and mental clarity within the first 2 weeks. Deeper cognitive shifts—such as sustained flow states and improved decision-making—typically develop over 6-8 weeks of consistent practice.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No. SpectrMind is an educational platform. All content is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider before making changes to your health regimen, especially regarding supplements or peptides.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel anytime with no questions asked. Monthly subscriptions can be cancelled before the next billing cycle. Annual plans come with our 30-day neural guarantee for a full refund within the first month.",
  },
  {
    question: "What's inside the Decision Lab?",
    answer:
      "The Decision Lab is a cognitive training environment featuring gamified challenges designed to strengthen your prefrontal cortex. You'll practice pattern recognition, probabilistic thinking, rapid decision-making under constraints, and bias identification—all backed by neuroscience research.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

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

      // Accordion items stagger
      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll(".faq-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: accordionRef.current,
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
      id="faq"
      className="section-padding relative"
      style={{ zIndex: 2 }}
    >
      <div className="content-max-width mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mono-tag text-peridot-spark mb-4">CLARITY</div>
          <h2
            ref={titleRef}
            className="font-display text-section text-mist"
          >
            {splitText("Frequently Asked")}
          </h2>
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item border-b border-ash/10"
                style={{ opacity: 0 }}
              >
                <AccordionTrigger className="py-5 text-left font-body text-base text-mist hover:text-peridot-spark transition-colors [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 font-body text-sm text-ash leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
