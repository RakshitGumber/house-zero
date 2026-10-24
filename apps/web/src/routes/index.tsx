import { createRoute } from "@tanstack/react-router";

import { ExploreSection } from "@/components/home/Explore";
import { Navbar } from "@/components/home/Navbar";
import { rootRoute } from "@/routes/__root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-svh bg-background">
      <Navbar />
      <ExploreSection />
    </main>
  );
}
