# Agent guidance: DGP Spec

Read and follow `../AGENTS.md` before working in this repository.

## Role

This repository is the language-neutral protocol authority. Changes here may affect every DGP implementation and must be versioned deliberately.

## Allowed

- Schemas, wire examples, protocol documentation, versioning rules, diagnostic codes, and conformance fixtures.
- Cross-language compatibility tests and generation tooling when introduced intentionally.

## Excluded

- Runtime graph interpretation; use sibling `dgp-core`.
- Product-definition validation implementations; use sibling `dgp-validation`.
- React or customer ordering behavior; use sibling `dgp-ordering`.
- Editorial workflows; use sibling `dgp-workspace`.
- Handler fulfillment behavior; use sibling `dgp-sdk`.

## References

- Legacy schema source: `D:\Projects\GitHub\digital-service-ui-builder\src\schema`.
- Backend DTO authority during migration: `D:\Projects\GitHub\elqora\dgp-sdk` and sibling `dgp-sdk`.
- Sibling repositories: `dgp-core`, `dgp-validation`, `dgp-ordering`, and `dgp-workspace`.
