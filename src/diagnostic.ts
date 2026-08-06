// SPDX-License-Identifier: GPL-3.0-only

export const PRODUCT_DEFINITION_DIAGNOSTIC_CODES = [
  "schema_required_property",
  "schema_invalid_type",
  "schema_invalid_value",
  "schema_unknown_property",
  "duplicate_node_id",
  "node_label_empty",
  "duplicate_filter_label",
  "duplicate_field_name",
  "duplicate_visible_field_label",
  "filter_binding_unknown",
  "field_binding_unknown",
  "filter_cycle",
  "filter_root_missing",
  "field_unreachable",
  "validation_context_limit_exceeded",
  "relationship_target_unknown",
  "relationship_conflict",
  "trigger_unknown",
  "effect_target_unknown",
  "effect_option_unknown",
  "option_effect_conflict",
  "visibility_dependency_cycle",
  "value_effect_conflict",
  "value_effect_cycle",
  "value_effect_value_invalid",
  "value_effect_cardinality_mismatch",
  "effect_target_unreachable",
  "field_validation_rule_invalid",
  "quantity_rule_invalid",
  "quantity_source_conflict",
  "capability_override_ignored",
  "service_reference_unknown",
  "service_selector_unconfigured",
  "customer_input_service_conflict",
  "service_state_unavailable",
  "service_quantity_bounds_incoherent",
  "service_rate_incoherent",
  "capability_requirement_unsatisfied",
  "fallback_node_unknown",
  "fallback_candidate_unknown",
  "fallback_primary_missing",
  "fallback_self_reference",
  "fallback_duplicate_candidate",
  "fallback_cycle",
  "fallback_context_unresolved",
  "fallback_capability_ineligible",
  "fallback_rate_ineligible",
  "utility_service_conflict",
  "utility_definition_missing",
  "utility_base_missing",
  "field_registry_entry_unknown",
  "field_options_unsupported",
  "field_recursive_options_unsupported",
  "field_multiple_unsupported",
] as const;

export type ProductDefinitionDiagnosticCode =
  (typeof PRODUCT_DEFINITION_DIAGNOSTIC_CODES)[number];

export const DIAGNOSTIC_SEVERITIES = ["error", "warning", "info"] as const;

export type DiagnosticSeverity = (typeof DIAGNOSTIC_SEVERITIES)[number];

/** Stable, editor-facing diagnostic emitted while ingesting or publishing a definition. */
export interface ProductDefinitionDiagnostic {
  code: ProductDefinitionDiagnosticCode;
  severity: DiagnosticSeverity;
  /** RFC 6901 JSON Pointer into the canonical document. */
  path: string;
  message: string;
  related_paths: string[];
  meta: Record<string, any>;
}

/** Complete result of validating one canonical ProductDefinition document. */
export interface ProductDefinitionValidationResult {
  valid: boolean;
  diagnostics: ProductDefinitionDiagnostic[];
}
