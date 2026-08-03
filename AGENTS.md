# Agent guidance: DGP Spec

Read and follow `../AGENTS.md` before working in this repository.

## Role and authority

This repository is the language-neutral protocol authority. It owns the canonical `ProductDefinition`, versioned JSON Schemas, snake-case wire contracts, protocol versions, diagnostic identifiers, expression declarations, generated-binding inputs, and cross-language conformance fixtures.

Explicit workspace architecture decisions govern until represented here. Once a contract is ratified in this repository, every SDK and consumer must conform; divergence is a defect. Existing `dgp-sdk` behavior remains authoritative only for backend concerns not yet decided here or in the workspace contract.

## Contract rules

- Author canonical machine-readable contracts as versioned JSON Schema, not TypeScript-first definitions.
- Generate TypeScript bindings from canonical schemas; do not maintain independently authored mirror types.
- Use `snake_case` for serialized keys.
- Define `meta` as an opaque host-owned JSON object. Do not reserve `{raw, derived}` as universal structure.
- Use `capabilities`; exclude canonical `flags`, root capability booleans, and `estimates`.
- Declare trusted browser JavaScript expressions as function bodies with documented arguments, return types, and structured failure expectations.
- Define advisory browser utility data in `OrderSnapshot` without making it authoritative pricing or charge data.
- Version breaking contract changes deliberately and maintain valid and invalid conformance fixtures.

## Clean-break rule

DGP v1 does not contain legacy adapters, aliases, deprecated fields, compatibility modes, or schemas for old definitions. Legacy schemas and tests are evidence only.

## Excluded

- Runtime interpretation; use sibling `dgp-core`.
- Definition-validation implementations; use sibling `dgp-validation`.
- Expression execution, customer state, utility calculation, or snapshot construction; use sibling `dgp-ordering`.
- Form Palette, React inputs, and descriptors; use sibling `dgp-ordering-form-palette`.
- Editorial orchestration; use sibling `dgp-workspace`.
- Visual authoring and testing UI; use sibling `dgp-studio`.
- Backend fulfillment; use sibling `dgp-sdk`.

## References

- Backend evidence for unratified behavior: sibling `../dgp-sdk`.
- Legacy schema evidence: `D:\Projects\GitHub\digital-service-ui-builder\src\schema`.
- Studio source evidence: `D:\Projects\GitHub\service-builder`; destination: sibling `../dgp-studio`.
- Siblings: `../dgp-core`, `../dgp-validation`, `../dgp-ordering`, `../dgp-ordering-form-palette`, `../dgp-workspace`, `../dgp-sdk`, and `../dgp-studio`.

This repository remains GPL-3.0.
