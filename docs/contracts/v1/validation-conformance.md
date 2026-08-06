# ProductDefinition validation conformance suite

- Status: **stable**
- Contract family: DGP v1
- Suite version: `1`
- Canonical source: `src/conformance.ts`
- Hand-authored cases: `fixtures/semantic/product-definition-validation.json`
- Generated artifact: `schemas/product-definition-validation-conformance-suite.schema.json`

## Purpose

The suite carries language-independent publication-validation cases whose definitions are structurally valid but whose accepted semantic outcome depends on Core interpretation, a handler service catalog, a host field registry, or configurable rate and fallback policy. Spec owns the case representation and expected protocol diagnostic identifiers. DGP Validation owns the TypeScript implementation; SDK bindings consume the applicable cases without acquiring frontend pricing authority.

`diagnostic_codes` is an exact, sorted, unique set for each case. Diagnostic paths, related paths, messages, and metadata remain separately tested by the owning implementation because those details can legitimately identify multiple occurrences of the same code.

## Context inputs

- `services` is handler-provided catalog evidence. Validation may check references, availability, capabilities, quantity bounds, and rate coherence; it never determines final prices or charges.
- `field_registry` lists exact canonical field `type`/`variant` entries and whether each entry supports authored options, recursive child options, and `multiple: true`. Resolution first checks the requested variant and then falls back to that type's `default` entry. Capabilities remain variant-specific because one type may expose scalar and option-bearing variants. An empty list means no registry was supplied, so registry-dependent checks are skipped.
- `rate_policy` controls coherence among co-selectable base services. `eq_primary` requires equality. `lte_primary` requires a candidate at or below the primary but no more than `pct` below it. `within_pct` allows a candidate up to `pct` above the primary without imposing a lower bound. `at_least_pct_lower` requires a candidate at least `pct` below the primary.
- `fallback_policy` separately controls fallback candidate rate and capability eligibility. It must never be silently replaced by the general `rate_policy`. A node reachable from multiple filter contexts is eligible when the candidate satisfies at least one applicable context; multiple contexts are not an ambiguity error.

Percentages are finite non-negative numbers. Invalid policy declarations are host configuration errors and do not amend a ProductDefinition.

## Trigger semantics

The current active filter, button fields, and recursive options may trigger value effects. The active filter is ordering context; hosts do not duplicate its identifier into customer selection bags, and ancestor filters do not implicitly trigger their value effects. Button include/exclude maps and option effects remain keyed only by button fields or recursive options.

Only triggers that can alter field visibility or available options contribute distinct publication-analysis states. A conforming validator exhausts at most `MAX_PRODUCT_DEFINITION_VALIDATION_CONTEXTS` (4096) such states. If further states remain, it emits `validation_context_limit_exceeded` and rejects publication; it must not return a successful result from a partial traversal.

## Compatibility

The cases use canonical v1 keys only. They preserve proven outcomes while deliberately excluding legacy component identifiers, `meta.multi`, `meta.variant`, `flags`, `estimates`, camel-case aliases, and frontend-owned final pricing.
