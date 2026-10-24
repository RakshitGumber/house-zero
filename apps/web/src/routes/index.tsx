import { createRoute } from "@tanstack/react-router";

import { Deployment } from "@/components/home/Deployment";
import { Directory } from "@/components/home/Directory";
import { Footer } from "@/components/home/Footer";
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
    <div className="min-h-svh bg-background">
      <Headline />
      <Navbar />
      <Hero />
      <Directory />
      <Deployment />
      <Footer />
    </div>
  );
}
