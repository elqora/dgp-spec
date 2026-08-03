# Service catalog contract rationale

- Status: **stable**
- Contract family: DGP v1
- Canonical source: `src/service.ts`
- Generated artifacts: `schemas/handler-service.schema.json` and `schemas/service-capability.schema.json`

## Rationale

`HandlerService`, `ServiceCapability`, and `HandlerServiceState` preserve the backend semantics currently owned by `dgp-sdk`: handlers identify and describe services, publish catalog rates and quantity bounds, declare named capabilities, and expose service availability state. Catalog rates remain handler data and do not become authoritative final prices or charges in browser consumers.

The portable representation deliberately differs from the SDK's current `ServiceMeta` serialization. Canonical `meta` is one opaque host-defined JSON object. PHP may retain raw/derived helper APIs internally, but the binding must hydrate and serialize the plain `meta` object losslessly after this contract is ratified.

Capabilities remain a map keyed by stable capability identifier, matching the SDK's established lookup semantics. Each value repeats its `id` so list and map bindings can share one value shape; conformance requires the map key and value identifier to match.

The contract rejects the legacy frontend `flags` and `estimates` fields. Service availability uses `state`, and named service behavior uses `capabilities`.

## Ratification evidence

The service catalog representation is reconciled with SDK-owned semantics, including the required opaque `meta` wire object. Hand-authored fixtures cover valid services and capabilities, legacy fields, nullable metadata, and capability key mismatches. Generated schemas are committed and drift-checked. This stable status becomes ratified when these artifacts are merged into `main`; publication and a `v1.0.0` tag make the ratified contract released.
