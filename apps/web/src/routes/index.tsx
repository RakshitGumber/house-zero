import { createRoute } from "@tanstack/react-router";

import { Headline } from "@/components/home/Headline";
import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/home/Navbar";
import { rootRoute } from "@/routes/__root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-svh bg-white">
      <Headline />
      <Navbar />
      <Hero />
    </div>
  );
}
