# DGP Spec

DGP Spec defines the canonical plain shared and wire contracts of the Digital Goods Protocol. During the migration, contracts are authored in TypeScript and accompanied by JSON fixtures, protocol versions, diagnostic identifiers, and generated JSON Schemas for non-TypeScript consumers.

Spec defines portable representation and versioning. Backend domain semantics remain owned by the DGP SDK, while language-specific DTOs and helpers act as bindings that must serialize losslessly to the shared contracts. See [CONTRACTS.md](CONTRACTS.md) for the authoring and ratification rules.

## Responsibilities

- Plain TypeScript product-definition and shared wire contracts
- Handler service, capability, manifest, and order snapshot wire contracts
- Protocol versioning and compatibility rules
- Shared valid and invalid fixtures
- Generated, committed JSON Schema interoperability artifacts
- Stable diagnostic identifiers and cross-language conformance expectations

No runtime interpretation, UI rendering, editorial workflow, or fulfillment implementation belongs here.

## Ecosystem

- [DGP Core](https://github.com/elqora/dgp-core) interprets product definitions.
- [DGP Validation](https://github.com/elqora/dgp-validation) validates definitions for ingestion and publication.
- [DGP Ordering](https://github.com/elqora/dgp-ordering) orchestrates customer ordering flows.
- [DGP Ordering Form Palette](https://github.com/elqora/dgp-ordering-form-palette) provides the optional Form Palette integration.
- [DGP Workspace](https://github.com/elqora/dgp-workspace) provides reusable editorial infrastructure.
- [DGP Studio](https://github.com/elqora/dgp-studio) provides visual authoring, testing, and publication UX.
- [DGP SDK](https://github.com/elqora/dgp-sdk) defines backend handler and fulfillment contracts.
- [Digital Service Engine](https://github.com/timeax/digital-service-engine) is the legacy migration source and behavioral reference.

## Toolchain

DGP Spec is an independent npm package. It supports Node.js 22 or newer and uses npm with the committed lockfile.

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run generate
npm run check:schemas
npm run check:boundaries
npm run build
npm run check
```

`npm run generate` derives JSON Schemas from the canonical TypeScript declarations and writes them to `schemas/`. These generated schemas are committed. `npm run check:schemas` regenerates into an isolated temporary directory and fails on file-set or content drift. Hand-authored valid and invalid JSON fixtures are exercised by `npm test`.

`npm run check` is the repository completion command. It runs lint, type checking, fixture tests, source-boundary enforcement, schema drift verification, and the package build.

## Contract status

The initial DGP v1 `ProductDefinition`, browser JavaScript expression, handler-service, and service-capability contracts are stable. Their reviewed rationale and ratification evidence are recorded in [the ProductDefinition rationale](docs/contracts/v1/product-definition.md) and [the service-catalog rationale](docs/contracts/v1/service-catalog.md). They become ratified when the complete TypeScript sources, fixtures, rationale, stable statuses, and generated schemas are merged into `main`, and released when version 1.0.0 is tagged and published.

## License

GPL-3.0-only.
