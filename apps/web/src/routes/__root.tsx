import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

function RootLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <Outlet />
    </div>
  );
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="text-4xl font-semibold tracking-tight">This room is empty.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you are looking for has moved or never existed.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
