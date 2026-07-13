"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundElements from "./BackgroundElements";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      <BackgroundElements />
      <Navbar />
      <main className={!isAdmin ? "flex-grow pt-20" : "flex-grow flex flex-col h-screen pt-20 overflow-hidden"}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
