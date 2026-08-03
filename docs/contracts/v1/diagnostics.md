# Product-definition diagnostics contract rationale

- Status: **stable**
- Contract family: DGP v1
- Added in package version: `1.1.0`
- Canonical source: `src/diagnostic.ts`
- Generated artifacts: `schemas/product-definition-diagnostic.schema.json` and `schemas/product-definition-validation-result.schema.json`

## Purpose and ownership

Spec owns the stable identifiers and plain representation used when canonical product definitions are checked during ingestion, editing, CI, and backend publication. DGP Validation owns the rules that emit these diagnostics. Studio owns their presentation, and Ordering never consumes or exposes them to customers.

Diagnostics use RFC 6901 JSON Pointers so every language can identify the same canonical location. `related_paths` captures other contributing locations without inventing node-specific fields. `meta` is required and remains an opaque JSON object; individual codes may document useful metadata without reserving universal nested structure.

## Code disposition

The initial identifiers cover schema failures, identity and graph coherence, relationship/effect references, visibility and value-effect cycles, ignored descendant capability overrides, fallback registration coherence, and advisory-utility conflicts. They deliberately retire legacy custom-component, frontend rate-authority, constraint, and compatibility diagnostics. Form-library resolution, service rates, charges, and fulfillment are not ProductDefinition validation concerns.

Host publication policies may produce a separate host-defined diagnostic family. They must not masquerade as universal DGP codes or amend `PRODUCT_DEFINITION_DIAGNOSTIC_CODES` outside Spec ratification.

## Ratification evidence

The TypeScript interfaces, stable code list, valid and invalid fixtures, rationale, and generated JSON Schemas are committed and drift-checked together. This extension does not change ProductDefinition schema version `1`; it versions the separately represented diagnostic contract in the Spec package.
