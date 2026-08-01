# DGP Spec

DGP Spec defines the canonical, language-neutral contracts of the Digital Goods Protocol. It will contain schemas, wire formats, protocol versions, diagnostic codes, and conformance fixtures shared by frontend engines, backend SDKs, and host implementations.

This repository defines what DGP data means; language-specific packages may represent these contracts natively but must not redefine them independently.

## Responsibilities

- Product-definition and service catalog schemas
- Handler service, capability, manifest, and order snapshot wire contracts
- Protocol versioning and compatibility rules
- Shared valid and invalid fixtures
- Stable diagnostic identifiers and cross-language conformance expectations

No runtime interpretation, UI rendering, editorial workflow, or fulfillment implementation belongs here.

## Ecosystem

- [DGP Core](https://github.com/elqora/dgp-core) interprets product definitions.
- [DGP Validation](https://github.com/elqora/dgp-validation) validates definitions for ingestion and publication.
- [DGP Ordering](https://github.com/elqora/dgp-ordering) orchestrates customer ordering flows.
- [DGP Workspace](https://github.com/elqora/dgp-workspace) provides reusable editorial infrastructure.
- [DGP SDK](https://github.com/elqora/dgp-sdk) defines backend handler and fulfillment contracts.
- [Digital Service Engine](https://github.com/timeax/digital-service-engine) is the legacy migration source and behavioral reference.

## Status

Repository scaffold only. Protocol extraction and migration will be planned separately.

## License

GPL-3.0.
