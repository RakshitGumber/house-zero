import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NotFoundPage } from "@/routes/not-found";

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <Outlet />
    </div>
  );
}
