# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are people and teams exploring or adopting a new class of AI models called System One models. They need to discover models and related tooling, evaluate what fits their work, and choose between running a model themselves or using a hosted service.

## Product Purpose

House Zero is a directory and distribution platform for System One AI models. It helps users discover models such as JEV, Clef, and Clairic, pull models for self-hosting, or use them through House Zero's hosted service. It also distributes shareable harnesses and memory modules that users can download and use with their model workflows.

Success means users can move from discovering a model or module to using it through their preferred deployment path with minimal friction.

## Positioning

The product is inspired by OpenRouter's role as a model-access layer, but centers specifically on System One models and extends beyond hosted model access into portable harnesses and memory modules. Its distinguishing mechanism is the combination of a focused model directory, self-hosting support, a hosted usage path, and downloadable supporting modules in one ecosystem.

## Operating Context

- Users browse a directory of System One models.
- Users can pull a model and host it on their own infrastructure.
- Users can instead use a model through the House Zero service.
- Users can find, share, download, and use harnesses and memory modules.

## Capabilities and Constraints

- The product must support System One models, including JEV, Clef, and Clairic.
- Both self-hosted and House Zero-hosted model usage are core product paths.
- Harnesses and memory modules are portable, shareable resources rather than only internal hosted features.
- The current implementation is a React 19 web application built with Vite, TypeScript, Tailwind CSS, TanStack Router, and Bun.
- Licensing, pricing, authentication, publishing permissions, model compatibility, hosting regions, security guarantees, API shape, and the exact meaning/specification of “System One” remain open decisions.

## Brand Commitments

- Working name in the repository: House Zero. Whether this is the final public name is not yet confirmed.
- Product terminology to preserve: System One models, models, harnesses, and memory modules.

## Evidence on Hand

- The repository contains an early landing-page implementation at `apps/web/src/routes/index.tsx`.
- No verified benchmarks, customer metrics, testimonials, pricing, model specifications, or production deployment claims are currently on hand.
- The existing landing-page metrics, testimonial, email address, and generic team-workspace copy are placeholders and must not be presented as factual product evidence.

## Product Principles

1. Make the System One ecosystem understandable and discoverable.
2. Preserve user choice between self-hosting and managed access.
3. Treat models, harnesses, and memory modules as portable building blocks.
4. Never fabricate performance claims, customer proof, compatibility, or availability.
5. Reduce the distance between evaluating a resource and putting it to use.
