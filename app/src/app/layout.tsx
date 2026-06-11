import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpectrMind — Neuro-Optimization Ecosystem",
  description:
    "The neuroscience-based system for peak cognitive performance, mental clarity, and sustained focus. Join 10,000+ cognitive pioneers transforming their reality.",
  keywords: [
    "neuro-optimization",
    "cognitive performance",
    "biohacking",
    "mental clarity",
    "flow state",
    "brain training",
    "meditation",
    "peptides",
    "nootropics",
    "wellness",
  ],
  authors: [{ name: "SpectrMind" }],
  openGraph: {
    title: "SpectrMind — Upgrade Your Mind. Control Your Reality.",
    description:
      "The neuro-optimization ecosystem for peak cognitive performance and mental clarity.",
    type: "website",
    locale: "en_US",
    siteName: "SpectrMind",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpectrMind — Neuro-Optimization Ecosystem",
    description:
      "Upgrade your mind with neuroscience-based cognitive training.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://spectrmind.com",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SpectrMind",
              description:
                "Neuro-optimization ecosystem for peak cognitive performance",
              url: "https://spectrmind.com",
              logo: "https://spectrmind.com/logo.png",
              sameAs: [
                "https://twitter.com/spectrmind",
                "https://instagram.com/spectrmind",
                "https://discord.gg/spectrmind",
              ],
            }),
          }}
        />
        {/* Structured Data - Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "SpectrMind Neuro-Optimization Platform",
              description:
                "Science-based cognitive performance training ecosystem",
              brand: {
                "@type": "Brand",
                name: "SpectrMind",
              },
              offers: [
                {
                  "@type": "Offer",
                  name: "Neuro-Hacker",
                  price: "49",
                  priceCurrency: "USD",
                  priceValidUntil: "2027-01-01",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  name: "Apex Predator",
                  price: "149",
                  priceCurrency: "USD",
                  priceValidUntil: "2027-01-01",
                  availability: "https://schema.org/InStock",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "1047",
              },
            }),
          }}
        />
      </head>
      <body className="bg-obsidian text-mist antialiased">
        {children}
      </body>
    </html>
  );
}
