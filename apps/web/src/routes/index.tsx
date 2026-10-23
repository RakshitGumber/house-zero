import { createRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { rootRoute } from "@/routes/__root";

const features = [
  {
    icon: Layers3,
    title: "One calm workspace",
    description:
      "Bring plans, decisions, and delivery into one shared view that stays easy to understand.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Signal over noise",
    description:
      "See what is moving, what is stuck, and what matters next without another status meeting.",
  },
  {
    icon: ShieldCheck,
    title: "Built for trust",
    description:
      "Clear ownership and thoughtful permissions keep the right people in the loop at every step.",
  },
];

function Logo() {
  return (
    <a href="#top" className="group inline-flex items-center gap-2.5" aria-label="House Zero home">
      <span className="grid size-9 place-items-center rounded-xl bg-foreground text-background shadow-sm transition-transform group-hover:-rotate-3">
        <span className="text-sm font-black">H0</span>
      </span>
      <span className="text-base font-bold tracking-tight">House Zero</span>
    </a>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl lg:mt-20">
      <div className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />
      <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-card/85 p-2 shadow-[0_30px_90px_-35px_rgba(72,45,25,0.35)] backdrop-blur-sm sm:p-3">
        <div className="rounded-[1.4rem] border border-border/70 bg-background/90 p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Today at a glance</p>
              <p className="mt-1 font-semibold">Product launch</p>
            </div>
            <div className="flex -space-x-2" aria-label="Four teammates active">
              {["AM", "JT", "SK", "+4"].map((initials, index) => (
                <span
                  className="grid size-8 place-items-center rounded-full border-2 border-background bg-secondary text-[10px] font-bold text-secondary-foreground"
                  key={initials}
                  style={{ zIndex: 4 - index }}
                >
                  {initials}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 pt-4 md:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl bg-secondary/55 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Momentum</span>
                <Badge className="border-0 bg-background/80 text-[10px]">+18% this week</Badge>
              </div>
              <div className="mt-8 flex h-28 items-end gap-2 sm:h-36">
                {[34, 48, 39, 68, 58, 82, 94].map((height, index) => (
                  <div className="flex h-full flex-1 items-end" key={height}>
                    <div
                      className="w-full rounded-t-md bg-primary/25 transition-colors hover:bg-primary/60"
                      style={{ height: `${height}%`, opacity: 0.55 + index * 0.06 }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              {["Finalize launch story", "Review onboarding flow", "Publish release notes"].map((item, index) => (
                <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4" key={item}>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full ${index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {index === 0 ? <Check className="size-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
                  </span>
                  <span className="text-xs font-semibold sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <>
      <header id="top" className="relative z-20 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-foreground" href="#features">Features</a>
            <a className="transition-colors hover:text-foreground" href="#approach">Approach</a>
            <a className="transition-colors hover:text-foreground" href="#contact">Contact</a>
          </nav>
          <Button asChild size="sm">
            <a href="#contact">Start building <ArrowRight /></a>
          </Button>
        </div>
      </header>

      <main>
        <section className="relative px-5 pb-20 pt-20 sm:px-8 sm:pt-28 lg:pb-28 lg:pt-36">
          <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <Badge><Sparkles className="size-3.5" /> A better rhythm for ambitious teams</Badge>
              <h1 className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                Make room for work that <span className="text-primary">matters.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                House Zero turns scattered plans into a clear path forward—so your team can move with focus, momentum, and confidence.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#contact">Build your workspace <ArrowRight /></a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#features">Explore the approach</a>
                </Button>
              </div>
            </div>
            <DashboardPreview />
          </div>
        </section>

        <section className="border-y border-border/70 bg-card/50 px-5 py-10 sm:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[["42%", "less time in status meetings"], ["2.4×", "faster decision cycles"], ["91%", "team-wide clarity"], ["1", "shared source of truth"]].map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Everything in its place</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Clarity is a feature, not a luxury.</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">A focused system for teams who want to spend less time managing work and more time making it exceptional.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map(({ icon: Icon, title, description }, index) => (
                <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg" key={title}>
                  <div className="absolute right-5 top-4 text-6xl font-semibold text-foreground/[0.035]">0{index + 1}</div>
                  <CardHeader>
                    <span className="mb-5 grid size-11 place-items-center rounded-2xl bg-secondary text-primary transition-transform group-hover:rotate-3 group-hover:scale-105"><Icon className="size-5" /></span>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="px-5 pb-24 sm:px-8 lg:pb-32">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-foreground text-background lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <Badge className="border-background/20 bg-background/10 text-background"><Zap className="size-3.5" /> Built to move</Badge>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">From zero to momentum.</h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-background/65">Start simple, find your rhythm, and scale without adding layers of process. House Zero grows with the way your team actually works.</p>
              <Button asChild className="mt-8 bg-background text-foreground hover:bg-background/90" size="lg">
                <a href="#contact">See how it works <ArrowRight /></a>
              </Button>
            </div>
            <div className="relative min-h-80 overflow-hidden bg-primary p-8 sm:p-12">
              <div className="absolute -right-16 -top-20 size-72 rounded-full border-[40px] border-background/10" />
              <div className="absolute -bottom-20 left-16 size-64 rounded-full bg-background/10 blur-2xl" />
              <div className="relative flex h-full flex-col justify-end">
                <div className="max-w-sm rounded-3xl border border-background/20 bg-background/10 p-6 backdrop-blur-md">
                  <p className="text-sm leading-6 text-background/80">“For the first time, everyone sees the same priorities—and we are shipping our best work without the churn.”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-background text-sm font-bold text-primary">MK</span>
                    <div><p className="text-sm font-semibold">Maya Kim</p><p className="text-xs text-background/60">Head of Product</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-24 sm:px-8 lg:pb-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card px-6 py-16 text-center shadow-sm sm:px-12 sm:py-20">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-primary"><Sparkles className="size-5" /></span>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Your best work starts with space.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Create a calmer place to plan, decide, and deliver—together.</p>
            <Button asChild className="mt-8" size="lg">
              <a href="mailto:hello@housezero.example">Start a conversation <ArrowRight /></a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Logo />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} House Zero. Built for meaningful work.</p>
        </div>
      </footer>
    </>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
