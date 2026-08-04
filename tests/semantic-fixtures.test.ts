// SPDX-License-Identifier: GPL-3.0-only

import suite from "../fixtures/semantic/product-definition-validation.json" with { type: "json" };
import expressionSuite from "../fixtures/semantic/browser-javascript-expression-execution.json" with { type: "json" };
import { describe, expect, it } from "vitest";

import {
  PRODUCT_DEFINITION_DIAGNOSTIC_CODES,
  type BrowserJavaScriptExpressionConformanceSuite,
  type ProductDefinitionValidationConformanceSuite,
} from "../src/index.js";

const fixture = suite as ProductDefinitionValidationConformanceSuite;
const expressions = expressionSuite as BrowserJavaScriptExpressionConformanceSuite;

describe("portable semantic conformance fixtures", () => {
  it("uses unique case identifiers and exact sorted unique diagnostic codes", () => {
    const ids = fixture.cases.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const item of fixture.cases) {
      const codes = item.expected.diagnostic_codes;
      expect(codes).toEqual([...new Set(codes)].sort());
      expect(codes.every((code) => PRODUCT_DEFINITION_DIAGNOSTIC_CODES.includes(code))).toBe(true);
      expect(item.expected.valid).toBe(codes.length === 0);
    }
  });

  it("covers every configurable publication-validation input family", () => {
    expect(fixture.cases.some((item) => item.context.services.length > 0)).toBe(true);
    expect(fixture.cases.some((item) => item.context.field_registry.length > 0)).toBe(true);
    expect(fixture.cases.some((item) => item.context.rate_policy !== null)).toBe(true);
    expect(fixture.cases.some((item) => item.context.fallback_policy !== null)).toBe(true);
  });
});

describe("browser JavaScript expression conformance fixtures", () => {
  it("covers field-local scalar, array, null, empty, and missing argument normalization", () => {
    const byId = new Map(expressions.cases.map((item) => [item.id, item]));
    expect(byId.get("present-scalar")?.expected.arguments).toEqual({
      value: "alpha",
      values: ["alpha"],
    });
    expect(byId.get("present-array")?.expected.arguments).toEqual({
      value: "alpha",
      values: ["alpha", "beta"],
    });
    expect(byId.get("present-null")?.expected.arguments).toEqual({ value: null, values: [null] });
    expect(byId.get("present-empty-array")?.expected.arguments).toEqual({ value: null, values: [] });
    expect(byId.get("missing-input")?.expected.arguments).toEqual({ value: null, values: [] });
  });

  it("covers successful quantity execution and every structured failure code", () => {
    const quantity = expressions.cases.find((item) => item.id === "valid-quantity-result");
    expect(quantity?.expected.ok).toBe(true);
    if (quantity?.expected.ok === true) expect(quantity.expected.value).toBe(4);
    expect(new Set(expressions.cases.flatMap((item) =>
      item.expected.failure_code === null ? [] : [item.expected.failure_code]))).toEqual(new Set([
      "expression_source_missing",
      "expression_execution_failed",
      "expression_result_invalid",
    ]));
  });
});
