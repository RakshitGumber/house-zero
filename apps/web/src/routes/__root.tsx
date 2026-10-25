import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NotFoundPage } from "@/routes/not-found";

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return (
    <div className="min-h-svh">
      <Outlet />
    </div>
  );
}
