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

## Status

Repository scaffold only. Protocol extraction and migration will be planned separately.

## License

GPL-3.0-only.
