# Agent guidance: DGP Spec

Read and follow `../AGENTS.md` before working in this repository.

## Role

This repository is the language-neutral protocol authority. Changes here may affect every DGP implementation and must be versioned deliberately. A canonical wire contract may explicitly target a particular runtime without requiring every SDK to execute it.

## Allowed

- Schemas, wire examples, protocol documentation, versioning rules, diagnostic codes, and conformance fixtures.
- Cross-language compatibility tests and generation tooling when introduced intentionally.
- Explicitly browser-targeted JavaScript expression declarations for quantity and customer-field evaluation when their wire shape belongs to the protocol.

## Excluded

- Runtime graph interpretation; use sibling `dgp-core`.
- Product-definition validation implementations; use sibling `dgp-validation`.
- Expression execution, customer input state, or ordering behavior; use sibling `dgp-ordering`.
- Form-library bindings, React input components, and default input descriptors; use sibling `dgp-ordering-form-palette`.
- Editorial session orchestration; use sibling `dgp-workspace`.
- Visual authoring, expression testing UI, and diagnostic presentation; use sibling `dgp-studio`.
- Handler fulfillment behavior; use sibling `dgp-sdk`.

## References

- Legacy schema source: `D:\Projects\GitHub\digital-service-ui-builder\src\schema`. Treat it as migration evidence, not automatic protocol authority.
- Backend DTO authority during migration: sibling `../dgp-sdk` at `D:\Projects\GitHub\elqora\digital-goods-protocol\dgp-sdk`.
- Studio destination: sibling `../dgp-studio`; code and history migration source: `D:\Projects\GitHub\service-builder`.
- Sibling repositories: `../dgp-core`, `../dgp-validation`, `../dgp-ordering`, `../dgp-ordering-form-palette`, `../dgp-workspace`, and `../dgp-studio`.
