# Product-definition diagnostics contract rationale

- Status: **stable**
- Contract family: DGP v1
- Added in package version: `1.1.0`
- Full migration vocabulary and semantic conformance suite: `1.4.0` (unreleased)
- Canonical source: `src/diagnostic.ts`
- Generated artifacts: `schemas/product-definition-diagnostic.schema.json` and `schemas/product-definition-validation-result.schema.json`

## Purpose and ownership

Spec owns the stable identifiers and plain representation used when canonical product definitions are checked during ingestion, editing, CI, and backend publication. DGP Validation owns the rules that emit these diagnostics. Studio owns their presentation, and Ordering never consumes or exposes them to customers.

Diagnostics use RFC 6901 JSON Pointers so every language can identify the same canonical location. `related_paths` captures other contributing locations without inventing node-specific fields. `meta` is required and remains an opaque JSON object; individual codes may document useful metadata without reserving universal nested structure.

## Code disposition

The identifiers cover schema failures, identity and graph coherence, contextual visibility and reachability, relationship/effect references and conflicts, customer-rule and quantity-source configuration, service-selection fit, capability requirements, fallback registration and eligibility, advisory-utility coherence, catalog-rate coherence, and optional field-registry resolution. Rule-configuration diagnostics reject malformed host declarations during publication rather than presenting them to customers as invalid input.

Legacy component references are not canonical protocol data. Their accepted publication behavior is preserved as `field_registry_entry_unknown`, evaluated only when a host registry is supplied for the canonical field `type` and variant fallback, while `field_multiple_unsupported` reports an authored multi-select request that the resolved registry entry cannot implement. Likewise, `service_rate_incoherent`, `fallback_rate_ineligible`, and service-bound diagnostics validate coherent use of handler-provided catalog evidence without making browser packages authoritative for rates, final prices, or charges. Compatibility names and frontend pricing authority remain excluded; the validation outcomes are not retired.

Host publication policies may produce a separate host-defined diagnostic family. They must not masquerade as universal DGP codes or amend `PRODUCT_DEFINITION_DIAGNOSTIC_CODES` outside Spec ratification. A host policy may use the same service catalog and graph context, but its code remains host-owned unless the rule is ratified as protocol behavior.

## Ratification evidence

The TypeScript interfaces, stable code list, valid and invalid fixtures, rationale, and generated JSON Schemas are committed and drift-checked together. `ProductDefinitionValidationConformanceSuite` supplies versioned, language-independent semantic cases with handler services, field-registry capabilities, configurable rate and fallback policy, and exact expected protocol codes. Host-only policy diagnostics are intentionally outside that suite. This extension does not change ProductDefinition schema version `1`; it versions the separately represented diagnostic and conformance contracts in the Spec package.
