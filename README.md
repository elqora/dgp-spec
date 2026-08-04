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

The diagnostic contract added in package 1.1 defines stable ProductDefinition publication codes, severities, RFC 6901 paths, and validation-result wire shapes without moving validation behavior into Spec. Package 1.2 adds the canonical OrderSnapshot wire contract and exact advisory utility-result representation. Package 1.3 extends stable diagnostics for relationship conflicts and malformed customer/quantity rules. The unreleased package 1.4 contract adds explicit field variants and multiple selection, restores the complete publication diagnostic vocabulary, and adds portable semantic validation and browser-expression conformance suites; see [MIGRATION.md](MIGRATION.md) for evidence and remaining downstream work.

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

The DGP v1 `ProductDefinition`, browser JavaScript expression, handler-service, service-capability, diagnostic, OrderSnapshot, and conformance-suite contracts are stable. Their reviewed rationale and ratification evidence are recorded in the versioned documents under [docs/contracts/v1](docs/contracts/v1). A contract becomes ratified when its complete TypeScript source, fixtures, rationale, stable status, and generated schema are merged into `main`, and released when its package version is tagged and published. Package 1.4 is currently unreleased.

## License

GPL-3.0-only.
