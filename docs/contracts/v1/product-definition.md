# ProductDefinition contract rationale

- Status: **stable**
- Contract family: DGP v1
- Schema version: `1`
- Canonical source: `src/product-definition.ts`
- Generated artifact: `schemas/product-definition.schema.json`

## Root and identity

`ProductDefinition` is the single authored root document regardless of whether a definition originates in a handler, Studio, a host, or an import. `id`, `name`, and `schema_version` are required. The version is the literal string `1`; legacy version `1.0` is not a v1 alias.

Decision 0001 retains the established `filters`, `fields`, and relationship-map vocabulary because it already describes proven behavior and has an SDK binding. Retention is not compatibility support: canonical documents must use the v1 nested shapes and snake_case keys.

## Authored and derived state

Filters author hierarchy, service bindings, inclusion/exclusion relationships, capability requirements, and optional quantity defaults. Authored capability requirements use `capabilities`. Effective inherited capabilities, their origins, and override evidence are deterministic Core results and are not written back into this contract.

Fields author customer inputs, options, bindings, defaults, validation declarations, quantity rules, service selection, and advisory utility declarations. Recursive options remain supported. Form-library components and runtime stores are not protocol data. `type` selects a host registry entry and JSON-compatible `defaults` configure it; no component identifier is serialized in `ProductDefinition`.

`meta` is always an opaque `Record<string, any>`. Quantity defaults, quantity rules, utility definitions, and capability requirements therefore have explicit properties and must never be inferred from reserved structures inside `meta`.

## Expressions

Quantity and customer-field `eval` rules carry a `BrowserJavaScriptExpression` with `language: "javascript"` and a trusted function `body`. The browser executor supplies ordered arguments `value` and `values`; missing input is normalized to `null`, while `values` is always an array. Quantity expressions must return a finite number. Customer-field expressions must return a JSON-compatible comparison value.

The expression is trusted host configuration, not untrusted customer code. Missing source, thrown execution, and invalid results use the stable failure codes in `EXPRESSION_FAILURE_CODES`. Ordering must not construct a valid `OrderSnapshot` after such a failure.

## Pricing boundary

`UtilityDefinition.rate` and later utility results are exact advisory browser calculations. They do not define handler service rates, final prices, charges, or fulfillment. Handlers validate submitted inputs and remain authoritative for those backend concerns.

## Behavioral evidence disposition

Retained behavior includes filter hierarchy, deterministic field ordering, recursive options, service binding, inclusion/exclusion visibility, forced visibility and option effects, value effects, fallbacks, quantity precedence and transforms, customer validation operators, and advisory utilities.

Redesigned behavior includes explicit quantity/utility declarations, structured expression declarations and failures, canonical capability requirements, and snake_case nested keys. Retired behavior includes root injection, legacy normalization, derived state in authored documents, `flags`, `estimates`, compatibility aliases, and frontend-owned rate authority.

## Ratification evidence

The v1 source and public exports are complete, SDK wire differences have been reconciled as binding work rather than frontend authority, hand-authored fixtures cover accepted and rejected shapes, and generated schemas are committed and drift-checked. This stable status becomes ratified when these artifacts are merged into `main`; publication and a `v1.0.0` tag make the ratified contract released.
