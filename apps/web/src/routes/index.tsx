import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "@/routes/__root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

function LandingPage() {
  return <main className="min-h-svh bg-white" />;
}
