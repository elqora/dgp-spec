// SPDX-License-Identifier: GPL-3.0-only

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Ajv, type ValidateFunction } from "ajv";
import addFormatsModule, { type FormatsPlugin } from "ajv-formats";
import { describe, expect, it } from "vitest";

interface FixtureEntry {
  fixture: string;
  schema: string;
  valid: boolean;
  semantic_rule?: "capability_key_matches_id";
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await readFile(path.join(root, "fixtures", "manifest.json"), "utf8"),
) as FixtureEntry[];
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true, strict: true });
const addFormats = addFormatsModule as unknown as FormatsPlugin;
addFormats(ajv);
const validators = new Map<string, Promise<ValidateFunction>>();

function validatorFor(schemaFilename: string): Promise<ValidateFunction> {
  const existing = validators.get(schemaFilename);
  if (existing !== undefined) {
    return existing;
  }

  const pending = readFile(path.join(root, "schemas", schemaFilename), "utf8")
    .then((contents: string) => ajv.compile(JSON.parse(contents) as object));
  validators.set(schemaFilename, pending);
  return pending;
}
function capabilityKeysMatchIds(value: unknown): boolean {
  if (typeof value !== "object" || value === null || !("capabilities" in value)) {
    return false;
  }
  const capabilities = value.capabilities;
  if (typeof capabilities !== "object" || capabilities === null) {
    return false;
  }
  return Object.entries(capabilities).every(([key, capability]) => {
    if (typeof capability !== "object" || capability === null) {
      return false;
    }
    const record = capability as Record<string, unknown>;
    return record["id"] === key;
  });
}

describe("hand-authored conformance fixtures", () => {
  for (const entry of manifest) {
    it(`${entry.valid ? "accepts" : "rejects"} ${entry.fixture}`, async () => {
      const fixture = JSON.parse(
        await readFile(path.join(root, "fixtures", entry.fixture), "utf8"),
      ) as unknown;
      const validate = await validatorFor(entry.schema);
      const structurallyValid = validate(fixture);
      const semanticallyValid = entry.semantic_rule === "capability_key_matches_id"
        ? capabilityKeysMatchIds(fixture)
        : true;

      expect(structurallyValid && semanticallyValid).toBe(entry.valid);
    });
  }
});
