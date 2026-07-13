import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundElements from "@/components/BackgroundElements";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-transparent text-ieee-black relative">
        
        <BackgroundElements />

        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
