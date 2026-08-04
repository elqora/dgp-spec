// SPDX-License-Identifier: GPL-3.0-only

import { describe, expect, it } from "vitest";

import { PRODUCT_DEFINITION_DIAGNOSTIC_CODES } from "../src/index.js";

describe("publication diagnostic migration coverage", () => {
  it.each([
    ["empty authored labels", "node_label_empty"],
    ["contextual duplicate labels", "duplicate_visible_field_label"],
    ["missing filter roots", "filter_root_missing"],
    ["unreachable fields", "field_unreachable"],
    ["invalid value-effect values", "value_effect_value_invalid"],
    ["value-effect cardinality", "value_effect_cardinality_mismatch"],
    ["unreachable effect targets", "effect_target_unreachable"],
    ["conflicting quantity sources", "quantity_source_conflict"],
    ["unconfigured service selectors", "service_selector_unconfigured"],
    ["customer/service input conflicts", "customer_input_service_conflict"],
    ["unavailable services", "service_state_unavailable"],
    ["service quantity bounds", "service_quantity_bounds_incoherent"],
    ["catalog rate coherence", "service_rate_incoherent"],
    ["unresolved fallback contexts", "fallback_context_unresolved"],
    ["fallback capability eligibility", "fallback_capability_ineligible"],
    ["fallback rate eligibility", "fallback_rate_ineligible"],
    ["missing utility declarations", "utility_definition_missing"],
    ["host field registries", "field_registry_entry_unknown"],
    ["unsupported multiple selection", "field_multiple_unsupported"],
  ] as const)("retains an identifier for %s", (_behavior, code) => {
    expect(PRODUCT_DEFINITION_DIAGNOSTIC_CODES).toContain(code);
  });
});
