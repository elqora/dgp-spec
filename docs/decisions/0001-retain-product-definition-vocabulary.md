# Decision 0001: retain ProductDefinition vocabulary

- Status: **accepted**
- Scope: initial DGP v1 `ProductDefinition` wire contract
- Evidence: `dgp-sdk/src/Catalog/Schemas/ProductDefinition.php`, SDK compliance tests, and the read-only legacy schema/core tests

## Decision

DGP v1 retains the established root keys `filters`, `fields`, `order_for_tags`, `includes_for_buttons`, `excludes_for_buttons`, `option_effects_for_buttons`, and `value_effects_for_triggers`.

Those names already have an SDK binding and substantial behavioral evidence. A clean v1 break permits redesign but does not justify renaming working concepts without a concrete semantic defect. Renaming them would create contract churn without improving ownership or runtime behavior.

Protocol-owned nested keys use canonical snake_case. Accordingly, nested legacy spellings such as `forceVisible`, `clearOnDeactivate`, `defaultValue`, `valueBy`, and `percentBase` are not canonical.

The retained vocabulary does not preserve obsolete structure:

- authored capability requirements use `capabilities`, not legacy `constraints` or `flags`;
- derived capability origins and overrides remain Core runtime state rather than authored contract data;
- quantity and advisory utility declarations are explicit because `meta` is opaque and cannot carry universal protocol meaning;
- the redundant field `component` property is removed; hosts resolve field `type` through their input registry;
- expression declarations use explicit browser JavaScript function bodies with Spec-owned argument and return contracts;
- `estimates`, compatibility aliases, deprecated fields, and legacy normalization modes remain excluded.

## Behavioral disposition

Retain hierarchical filters, deterministic field order, recursive options, filter and option service bindings, include/exclude visibility, forced target visibility, option filtering, triggered field values, fallbacks, quantity resolution, customer validation, and advisory utility calculations. Core interprets only canonical documents and does not inject a legacy root filter.
