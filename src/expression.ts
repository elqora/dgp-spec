// SPDX-License-Identifier: GPL-3.0-only

import type { JsonValue } from "./json.js";

/** Ordered arguments supplied to every trusted browser JavaScript expression. */
export const BROWSER_JAVASCRIPT_EXPRESSION_ARGUMENTS = ["value", "values"] as const;

/** A trusted host-authored browser JavaScript function body. */
export interface BrowserJavaScriptExpression {
  language: "javascript";
  /** @minLength 1 */
  body: string;
}

/**
 * Plain input contract for a browser JavaScript expression.
 *
 * For one field's raw customer input, `value` is the scalar input or the first
 * array item, while `values` is the complete array form. A present scalar,
 * including an explicit null, becomes a one-item `values` array. Missing input
 * is the sole exception: it is represented by `value: null` and `values: []`.
 * These arguments never contain the values of unrelated fields.
 */
export interface BrowserJavaScriptExpressionInput {
  value: JsonValue;
  values: JsonValue[];
}

/** Quantity expressions must return a finite number. */
export type QuantityExpressionResult = number;

/** Customer-field expressions must return a JSON-compatible comparison value. */
export type CustomerFieldExpressionResult = JsonValue;

export const EXPRESSION_FAILURE_CODES = [
  "expression_source_missing",
  "expression_execution_failed",
  "expression_result_invalid",
] as const;

export type ExpressionFailureCode = (typeof EXPRESSION_FAILURE_CODES)[number];

/** Structured failure returned when trusted host expression configuration is unusable. */
export interface ExpressionHostConfigurationFailure {
  kind: "host_configuration";
  code: ExpressionFailureCode;
  path: string;
  message: string;
  meta: Record<string, any>;
}
