import { createRoute } from "@tanstack/react-router";

import { HeroSection } from "@/components/home/Hero";
import { SiteHeader } from "@/components/home/Navbar";
import { rootRoute } from "@/routes/__root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-svh bg-background">
      <SiteHeader />
      <HeroSection />
    </main>
  );
}
