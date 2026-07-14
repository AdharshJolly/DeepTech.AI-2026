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
  title: "DeepTech.ai 2026 - The premier IEEE CS event for Physical AI and Robotics",
  description: "DeepTech.ai 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
  keywords: ["DeepTech", "AI", "Physical AI", "Robotics", "IEEE CS", "Conference", "2026"],
  openGraph: {
    title: "DeepTech.ai 2026 - The premier IEEE CS event for Physical AI and Robotics",
    description: "DeepTech.ai 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DeepTech.ai 2026 Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepTech.ai 2026 - The premier IEEE CS event for Physical AI and Robotics",
    description: "DeepTech.ai 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
    images: ["/og-image.jpg"],
  },
};

import AppWrapper from "@/components/AppWrapper";

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
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "DeepTech.ai 2026",
              description: "DeepTech.ai 2026 is the flagship IEEE Computer Society event focused on Physical AI, bridging digital intelligence and physical systems.",
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
      <body className="min-h-full flex flex-col font-sans bg-transparent text-ieee-black relative">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
