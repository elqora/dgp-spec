// SPDX-License-Identifier: GPL-3.0-only

import type { BrowserJavaScriptExpression } from "./expression.js";
import type { JsonPrimitive, JsonValue } from "./json.js";
import type { Integer, ServiceId } from "./service.js";

export const PRODUCT_DEFINITION_SCHEMA_VERSION = "1" as const;

export type ProductDefinitionSchemaVersion = typeof PRODUCT_DEFINITION_SCHEMA_VERSION;

export type PricingRole = "base" | "utility";

export type CapabilityRequirements = Record<string, boolean>;

export interface QuantityClamp {
  min?: number;
  max?: number;
}

interface QuantityRuleTransforms {
  multiply?: number;
  clamp?: QuantityClamp;
  fallback?: number;
}

export type QuantityRule =
  | (QuantityRuleTransforms & {
      value_by: "value" | "length";
    })
  | (QuantityRuleTransforms & {
      value_by: "eval";
      expression: BrowserJavaScriptExpression;
    });

export type UtilityMode = "flat" | "per_quantity" | "per_value" | "percent";

export interface UtilityDefinition {
  rate: number;
  mode: UtilityMode;
  value_by?: "value" | "length";
  percent_base?: "service_total" | "base_service" | "all";
  label?: string;
}

export type FieldValidationValueBy = "value" | "length" | "eval";

export type FieldValidationOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "between"
  | "in"
  | "nin"
  | "truthy"
  | "falsy"
  | "match";

interface FieldValidationRuleBase {
  op: FieldValidationOperator;
  value?: JsonValue;
  min?: number;
  max?: number;
  values?: JsonValue[];
  pattern?: string;
  pattern_flags?: string;
  code?: string;
  message?: string;
}

export type FieldValidationRule =
  | (FieldValidationRuleBase & {
      value_by?: "value" | "length";
    })
  | (FieldValidationRuleBase & {
      value_by: "eval";
      expression: BrowserJavaScriptExpression;
    });

export interface FieldOption {
  id: string;
  label: string;
  value?: JsonPrimitive;
  service_id?: ServiceId;
  pricing_role?: PricingRole;
  quantity_default?: number;
  utility?: UtilityDefinition;
  meta?: Record<string, any>;
  children?: FieldOption[];
}

interface ProductFieldBase {
  id: string;
  type: string;
  /** Optional host-registry variant; registries fall back to their default variant. */
  variant?: string;
  label: string;
  bind_id?: string | string[];
  name?: string;
  required?: boolean;
  /** Allows more than one selected option for this field. */
  multiple?: boolean;
  default_value?: JsonValue;
  defaults?: Record<string, JsonValue>;
  options?: FieldOption[];
  description?: string;
  pricing_role?: PricingRole;
  validation?: FieldValidationRule[];
  quantity_default?: number;
  quantity?: QuantityRule;
  utility?: UtilityDefinition;
  meta?: Record<string, any>;
}

export type ProductField = ProductFieldBase &
  (
    | {
        button?: false;
      }
    | {
        button: true;
        service_id?: ServiceId;
      }
  );

export interface ProductFilter {
  id: string;
  label: string;
  bind_id?: string;
  service_id?: ServiceId;
  includes?: string[];
  excludes?: string[];
  capabilities?: CapabilityRequirements;
  quantity_default?: number;
  meta?: Record<string, any>;
}

export interface OptionEffectForButton {
  force_visible?: boolean;
  include?: string[];
  exclude?: string[];
}

export interface FieldValueEffect {
  value: JsonValue;
  mode?: "always" | "if_empty";
  clear_on_deactivate?: boolean;
}

export interface ServiceFallbacks {
  nodes?: Record<string, ServiceId[]>;
  global?: Record<string, ServiceId[]>;
}

export type ProductNoticeType = "public" | "private";

export type ProductNoticeSeverity = "info" | "warning" | "error";

export type ProductNoticeKind =
  | "label"
  | "warning"
  | "deprecation"
  | "compat"
  | "migration"
  | "policy";

export type ProductNoticeTarget =
  | { scope: "global" }
  | {
      scope: "node";
      node_kind: "tag" | "field" | "option";
      node_id: string;
    };

export interface ProductNotice {
  id: string;
  type: ProductNoticeType;
  kind: ProductNoticeKind;
  severity: ProductNoticeSeverity;
  target: ProductNoticeTarget;
  title: string;
  description?: string;
  reason?: string;
  /** @format date-time */
  marked_at?: string;
  meta?: Record<string, any>;
}

/** Canonical authored root contract for a DGP v1 product. */
export interface ProductDefinition {
  id: string | Integer;
  name: string;
  filters: ProductFilter[];
  fields: ProductField[];
  order_for_tags: Record<string, string[]>;
  includes_for_buttons: Record<string, string[]>;
  excludes_for_buttons: Record<string, string[]>;
  option_effects_for_buttons: Record<string, Record<string, OptionEffectForButton>>;
  value_effects_for_triggers: Record<string, Record<string, FieldValueEffect>>;
  schema_version: ProductDefinitionSchemaVersion;
  fallbacks: ServiceFallbacks | null;
  description: string | null;
  notices: ProductNotice[];
  meta: Record<string, any>;
}
