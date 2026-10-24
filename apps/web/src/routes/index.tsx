import { createRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/home/Navbar";
import { LeanJourney } from "@/components/home/LeanJourney";
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
      <LeanJourney />
    </main>
  );
}
