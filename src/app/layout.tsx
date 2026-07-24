import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://deep-tech-ai-26.vercel.app"),
  title: "DeepTech.AI 2026 - The premier IEEE CS event for Physical AI and Robotics",
  description: "DeepTech.AI 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
  keywords: ["DeepTech", "AI", "Physical AI", "Robotics", "IEEE CS", "Conference", "2026"],
  openGraph: {
    title: "DeepTech.AI 2026 - The premier IEEE CS event for Physical AI and Robotics",
    description: "DeepTech.AI 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
    url: "https://deep-tech-ai-26.vercel.app",
    siteName: "DeepTech.AI 2026",
    images: [
      {
        url: "/images/Banners/1254x1254.jpeg",
        width: 1254,
        height: 1254,
        alt: "DeepTech.AI 2026 - Where Digital Intelligence Meets the Physical World",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepTech.AI 2026 - The premier IEEE CS event for Physical AI and Robotics",
    description: "DeepTech.AI 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
    images: ["/images/Banners/1600x639.jpeg"],
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
    canonical: "/",
  },
  authors: [
    { name: "IEEE Computer Society" },
    { name: "Adharsh Jolly", url: "https://linkedin.com/in/adharsh-jolly" }
  ],
  creator: "Adharsh Jolly (https://github.com/AdharshJolly)",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

import AppWrapper from "@/components/AppWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <GoogleAnalytics />
        {/* 
          System Architecture and Development by Adharsh Jolly
          GitHub: https://github.com/AdharshJolly
          LinkedIn: https://linkedin.com/in/adharsh-jolly
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "DeepTech.AI 2026",
              description: "DeepTech.AI 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
              startDate: "2026-10-15T09:00:00+00:00",
              endDate: "2026-10-17T17:00:00+00:00",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: "Convention Center",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "123 Main St",
                  addressLocality: "Anytown",
                  postalCode: "12345",
                  addressCountry: "US"
                }
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-transparent text-ieee-black relative" suppressHydrationWarning>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
