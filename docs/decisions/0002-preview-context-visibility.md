# Decision 0002: preview-context visibility expressions

- Status: **accepted**
- Scope: optional field and recursive-option visibility expressions in ProductDefinition v1
- Evidence: current Core visibility contract, Ordering's OrderPreview construction, and the user-approved feature plan

## Decision

Fields and recursive options may store a trusted browser JavaScript `visibility_expression`. The expression receives the current provisional `OrderPreview` as its only argument, named `preview`; its raw result is converted with JavaScript `Boolean(...)`.

When an expression is configured, its truthy/falsy result overrides existing visibility mechanisms for that node. Without an expression, existing behavior remains in force. An option expression does not force its parent field visible.

Ordering enriches its transient preview with the selected `HandlerService` records needed by expressions, including capabilities. This derived `service_context` does not enter the canonical submitted `OrderSnapshot`.

Ordering first creates a provisional preview from the current form state using existing visibility behavior, evaluates expressions against it, then creates the final preview/snapshot with the expression decisions. Missing source or thrown execution is a structured host-configuration failure; no valid snapshot is returned.

## Consequences

- Core remains framework-neutral and does not execute JavaScript.
- Browser Ordering owns expression execution and contextual visibility composition.
- Studio authors and tests the trusted expression and shows host-configuration failures.
- The SDK preserves the new authored property but does not execute it.
