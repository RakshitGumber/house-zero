import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Nothing to show here.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you are looking for has moved or never existed.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block bg-primary px-5 py-3 font-bold text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
