import { createRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState, type PointerEvent } from "react";

import { rootRoute } from "@/routes/__root";

const models = [
  {
    id: "jev",
    name: "JEV",
    position: "near",
    copy: "A System One model available to inspect through House Zero.",
  },
  {
    id: "clef",
    name: "CLEF",
    position: "middle",
    copy: "Pull it into your own stack, or choose a hosted path.",
  },
  {
    id: "clairic",
    name: "CLAIRIC",
    position: "far",
    copy: "Pair models with portable harnesses and memory modules.",
  },
] as const;

type ModelId = (typeof models)[number]["id"];

function LandingPage() {
  const [active, setActive] = useState<ModelId>("jev");
  const current = models.find((model) => model.id === active) ?? models[0];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--mx", `${x * -18}px`);
    event.currentTarget.style.setProperty("--my", `${y * -12}px`);
  }

  return (
    <main className={`landing focus-${current.position}`} onPointerMove={handlePointerMove}>
      <header className="topbar" data-ui>
        <nav aria-label="House Zero sections" className="nav-group">
          <a href="#models">Models</a>
          <a href="#models">Harnesses</a>
          <a href="#models">Memory</a>
        </nav>

        <a className="brand" href="#top" aria-label="House Zero home">
          HOUSE <span>ZERO</span>
        </a>

        <a className="nav-cta" href="#models">
          Explore <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
        </a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <img src="/images/telescope-hero.png" alt="" />
        </div>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="orbit orbit-a" aria-hidden="true" />
        <div className="orbit orbit-b" aria-hidden="true" />

        <h1 id="hero-title">
          <span>SYSTEM</span>
          <span>ONE</span>
        </h1>

        <div className="focus-mark" aria-hidden="true">
          <span className="focus-cross" />
          <span className="focus-name">{current.name}</span>
        </div>

        <div className="hero-copy">
          <p>
            A home for a new class of AI. Discover System One models, then run
            them yourself or through House Zero.
          </p>
          <a href="#models">
            Enter the observatory
            <ArrowDownLeft aria-hidden="true" size={15} strokeWidth={1.5} />
          </a>
        </div>

        <div className="model-focus" id="models" data-ui>
          <p className="model-description" aria-live="polite">{current.copy}</p>
          <div className="model-list" aria-label="Focus a model">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                className={model.id === active ? "is-active" : ""}
                aria-pressed={model.id === active}
                onClick={() => setActive(model.id)}
                onPointerEnter={() => setActive(model.id)}
              >
                {model.name}
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className="scene-meta" aria-hidden="true" data-ui>
          <span>OBSERVATION 01</span>
          <span>SELF-HOSTED / HOUSE ZERO HOSTED</span>
          <span>FIELD: SYSTEM ONE</span>
        </div>
      </section>
    </main>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
