# Agent guidance: DGP Spec

Read and follow `../AGENTS.md` before working in this repository.

## Role and authority

This repository owns canonical plain shared and wire contracts for DGP. During migration, those contracts are authored in TypeScript and include `ProductDefinition`, wire naming, protocol versions, diagnostic identifiers, expression declarations, JSON fixtures, and generated JSON Schema artifacts.

Read `CONTRACTS.md` before proposing or changing a shared contract. Spec owns portable representation and versioning, not every domain. `dgp-sdk` remains authoritative for backend domain semantics; proven legacy frontend behavior must be preserved by default in its owning package. Redesign or retirement requires explicit recorded user approval.

## Contract lifecycle

- A contract is **draft** while its plain TypeScript definition is proposed, unmerged, incomplete, or explicitly marked draft. It is not authoritative.
- A contract is **ratified** only when its versioned plain TypeScript definition, required JSON fixtures, rationale, and explicit stable status are merged into `dgp-spec/main`. Generated JSON Schemas must also be current once generation tooling exists.
- A contract is **released** when that ratified version is tagged and published.

Dependent repositories may implement ratified, unreleased contracts during coordinated development. Stable dependent releases require a released Spec version. Merge alone is insufficient when any ratification artifact is missing, and release does not replace ratification.

## Contract rules

- Author canonical contracts as plain TypeScript interfaces, type aliases, and constants.
- Keep definitions JSON-compatible and free of classes, methods, callbacks, React or framework types, stores, and derived or editorial runtime state.
- Generate JSON Schemas from canonical TypeScript, commit them for non-TypeScript consumers, and check them for drift once tooling exists.
- Treat PHP DTOs and other language representations as bindings that must hydrate and serialize losslessly; do not copy their class hierarchies into the shared contract.
- Use `snake_case` for serialized keys.
- Define `meta` as an opaque host-owned JSON object. Do not reserve `{raw, derived}` as universal structure.
- Use `capabilities`; exclude canonical `flags`, root capability booleans, and `estimates`.
- Declare trusted browser JavaScript expressions as function bodies with documented arguments, return types, and structured failure expectations.
- Define advisory browser utility data in `OrderSnapshot` without making it authoritative pricing or charge data.
- Version breaking contract changes deliberately and maintain valid and invalid conformance fixtures.
- Represent preserved behavior completely enough for every owning runtime to implement it without inventing a narrower local contract.
- Define expression arguments, ordering, return semantics, and failures precisely; do not ratify an ambiguous expression contract.
- Add portable semantic conformance fixtures when implementation resumes so Validation, the SDK, and future language implementations can prove the same outcomes.

## Migration completeness

- Inventory the legacy contract evidence behind every shared shape and diagnostic. Default to preserving behavior while replacing legacy names and wire structure with canonical v1 forms.
- A missing contract, diagnostic, fixture, or semantic case is **pending migration**, not an implicit retirement.
- Do not ratify a contract that narrows proven behavior unless the migration record links to explicit user approval for that redesign or retirement.
- Schema validity alone is not conformance completeness. Required fixtures must cover structural and semantic outcomes used across language and runtime boundaries.

## Clean-break rule

DGP v1 does not contain legacy adapters, aliases, deprecated fields, compatibility modes, or schemas for old definitions. This clean break concerns representation and compatibility only; legacy schemas and tests remain binding behavioral evidence by default.

## Change workflow and operations

- Identify ownership and reconcile SDK backend semantics or accepted upgraded frontend behavior before ratifying a shared representation.
- Land plain TypeScript contracts, diagnostics, JSON fixtures, rationale, and stable status here before dependent packages implement a shared contract.
- Generate and drift-check JSON Schemas once tooling exists, then align SDK serialization and Core, followed by Validation, Ordering and its adapter, and Workspace as applicable.
- Commit and release every repository independently and publish stable artifacts in dependency order.
- The supported runtime is Node.js 22 or newer. Install the locked dependency graph with `npm install`.
- Run tests with `npm test`, lint with `npm run lint`, type checking with `npm run typecheck`, build with `npm run build`, and JSON Schema generation with `npm run generate`.
- Generated JSON Schemas under `schemas/` are committed. Verify drift with `npm run check:schemas` and source boundaries with `npm run check:boundaries`.
- Run the full repository completion check with `npm run check`. Completion requires every subcommand to pass, required hand-authored fixtures and rationale to be current, generated schemas to be clean, and `git status` to contain no unintended changes.

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

This repository remains GPL-3.0-only. Future manifests and source headers must use that exact SPDX identifier.
