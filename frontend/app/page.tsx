"use client";

import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import IdentityCards from "@/components/home/IdentityCards";

export default function HomePage() {
  return (
    <PageTransition themeId="home">
      <HeroSection />
      <IdentityCards />
    </PageTransition>
  );
}
