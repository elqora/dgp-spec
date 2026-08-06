// SPDX-License-Identifier: GPL-3.0-only

import type {
  ProductDefinitionDiagnosticCode,
} from "./diagnostic.js";
import type {
  BrowserJavaScriptExpression,
  BrowserJavaScriptExpressionInput,
  ExpressionFailureCode,
} from "./expression.js";
import type { JsonValue } from "./json.js";
import type { ProductDefinition } from "./product-definition.js";
import type { HandlerService } from "./service.js";

/** Maximum effect-bearing visibility states a conforming publication validator may exhaust. */
export const MAX_PRODUCT_DEFINITION_VALIDATION_CONTEXTS = 4096;

/** Configurable catalog-rate comparison used by portable publication cases. */
export type ServiceRatePolicy =
  | { kind: "eq_primary" }
  | { kind: "lte_primary"; /** @minimum 0 */ pct: number }
  | { kind: "within_pct"; /** @minimum 0 */ pct: number }
  | { kind: "at_least_pct_lower"; /** @minimum 0 */ pct: number };

/** Host field-registry capability supplied to publication validation. */
export interface FieldRegistryConformanceEntry {
  type: string;
  variant: string;
  /** Whether this exact type/variant can render authored options. */
  options: boolean;
  /** Whether this exact type/variant can render recursive child options. */
  recursive_options: boolean;
  multiple: boolean;
}

/** Portable optional inputs required by catalog- and registry-aware rules. */
export interface ProductDefinitionValidationConformanceContext {
  services: HandlerService[];
  field_registry: FieldRegistryConformanceEntry[];
  rate_policy: ServiceRatePolicy | null;
  fallback_policy: {
    require_capability_fit: boolean;
    rate_policy: ServiceRatePolicy;
  } | null;
}

export interface ProductDefinitionValidationConformanceExpectation {
  valid: boolean;
  /** Exact sorted unique protocol diagnostic codes expected for the case. */
  /** @uniqueItems true */
  diagnostic_codes: ProductDefinitionDiagnosticCode[];
}

/** One language-independent semantic publication-validation case. */
export interface ProductDefinitionValidationConformanceCase {
  id: string;
  description: string;
  definition: ProductDefinition;
  context: ProductDefinitionValidationConformanceContext;
  expected: ProductDefinitionValidationConformanceExpectation;
}

/** Versioned collection consumed by Validation and applicable SDK bindings. */
export interface ProductDefinitionValidationConformanceSuite {
  version: "1";
  cases: ProductDefinitionValidationConformanceCase[];
}

export type BrowserJavaScriptExpressionRawInput =
  | { kind: "missing" }
  | { kind: "present"; value: JsonValue };

export type BrowserJavaScriptExpressionConformanceExpectation =
  | {
      ok: true;
      arguments: BrowserJavaScriptExpressionInput;
      value: JsonValue;
      failure_code: null;
    }
  | {
      ok: false;
      arguments: BrowserJavaScriptExpressionInput;
      value: null;
      failure_code: ExpressionFailureCode;
    };

/** One normalization and execution case for the trusted browser contract. */
export interface BrowserJavaScriptExpressionConformanceCase {
  id: string;
  purpose: "customer_validation" | "quantity";
  expression: BrowserJavaScriptExpression | null;
  raw_input: BrowserJavaScriptExpressionRawInput;
  expected: BrowserJavaScriptExpressionConformanceExpectation;
}

export interface BrowserJavaScriptExpressionConformanceSuite {
  version: "1";
  cases: BrowserJavaScriptExpressionConformanceCase[];
}
