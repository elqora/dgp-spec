# DGP shared-contract guide

This guide defines how DGP shared contracts are authored, reconciled, ratified, represented in other languages, and evolved during the package migration.

## Authority by concern

- The workspace constitution owns repository boundaries and dependency direction.
- `dgp-sdk` owns backend domain semantics and terminology for handlers, services, capabilities, rates, charges, plans, deliveries, actions, and fulfillment.
- `dgp-spec` owns the canonical plain shared and wire representation, versions, fixtures, and generated interoperability artifacts.
- The legacy frontend engine supplies behavioral evidence. Owning packages decide whether that behavior is retained, improved, redesigned, or retired.
- Runtime packages own behavior within their boundaries but may not redefine shared contracts locally.

Spec ratification formalizes a reconciled representation; it does not transfer backend domain ownership from the SDK. Incorrect representation of established SDK semantics is a Spec defect. Incorrect SDK serialization of a ratified shared contract is an SDK binding defect. Intentional backend domain changes require coordinated SDK and Spec decisions.

## TypeScript-first authoring

During this migration, canonical contracts are authored as TypeScript interfaces, type aliases, and plain constants. TypeScript is the authoring source because the immediate work is decomposition and improvement of the existing frontend engine.

Canonical definitions must:

- represent the `snake_case` JSON wire keys directly;
- contain only JSON-compatible objects, arrays, strings, numbers, booleans, and null values;
- keep host-defined `meta` typed as `Record<string, any>`, while requiring values that cross the wire to be JSON-serializable;
- store browser JavaScript expressions as source strings plus plain metadata, never as function values;
- exclude classes, constructors, methods, callbacks, React types, framework objects, stores, services, and editor or derived runtime state;
- separate authored data from deterministic derived state, ordering state, editorial state, and presentation state.

Do not independently author equivalent shared types in consumer packages. Consumers import Spec contracts or use a language binding that demonstrably maps to them.

## Language bindings

SDKs may provide idiomatic DTOs, enums, collections, value objects, hydrators, and helpers. Those APIs are bindings and reference implementations, not additional protocol structure.

A binding must:

- accept the canonical plain wire representation;
- serialize losslessly back to the same representation and wire keys;
- preserve unknown host metadata permitted by the contract;
- avoid requiring other languages to reproduce its class hierarchy;
- distinguish internal convenience from ratified wire structure.

For example, a PHP helper may distinguish raw and derived provider metadata internally, but it must not make `{raw, derived}` universal shared structure unless that plain wire shape is deliberately ratified. Canonical `meta` otherwise remains an opaque host-defined object.

## JSON fixtures and generated schemas

Hand-authored JSON fixtures provide language-independent examples of valid and invalid wire data. Fixtures are reviewed contract evidence and must not be generated solely from the TypeScript declarations they are intended to test.

JSON Schemas are secondary interoperability artifacts generated from canonical TypeScript. Once generation tooling exists:

- generated schemas are committed and published for non-TypeScript consumers;
- repository checks fail when generated schemas drift from canonical TypeScript;
- a contract cannot be ratified or released with stale generated artifacts;
- manual schema patches must be represented in the TypeScript source or documented generation configuration rather than maintained as a competing source of truth.

Moving to JSON-Schema-first authoring requires a separate explicit architecture decision.

## Contract lifecycle

- **Draft:** the plain TypeScript contract is proposed, incomplete, unmerged, or explicitly marked draft. It is not authoritative.
- **Ratified:** the versioned plain TypeScript contract, required JSON fixtures, rationale, and explicit stable status are merged into `dgp-spec/main`; generated JSON Schemas are also current once tooling exists.
- **Released:** the ratified contract version is tagged and published.

Dependent packages may implement ratified unreleased contracts during coordinated development. Stable releases require the applicable released Spec version.

## Change workflow

1. Identify the owning concern and inspect relevant legacy behavioral evidence.
2. Start with SDK semantics for backend concepts and deliberately accepted upgraded behavior for frontend concepts.
3. Draft the plain TypeScript contract, diagnostics, and JSON fixtures in Spec.
4. Reconcile any SDK and wire changes through a coordinated decision.
5. Ratify the shared contract.
6. Align SDK serialization and Core interpretation where applicable.
7. Update Validation, Ordering, the Form Palette adapter, and Workspace in dependency order.
8. Commit, tag, and publish each repository independently in dependency order.

## Clean-break migration

DGP v1 does not accept legacy wire formats, aliases, deprecated fields, compatibility modes, or legacy adapters. Clean break does not mean discarding proven behavior. Record whether each relevant legacy behavior is retained, improved, redesigned, or retired, together with its evidence and destination owner.
