import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createGenerator } from "ts-json-schema-generator";

import { schemaTargets } from "./schema-targets.mjs";

const root = path.resolve(import.meta.dirname, "..");

export async function generateSchemas(outputDirectory) {
  await mkdir(outputDirectory, { recursive: true });

  const generator = createGenerator({
    path: path.join(root, "src", "**", "*.ts"),
    tsconfig: path.join(root, "tsconfig.json"),
    type: "*",
    expose: "export",
    topRef: true,
    additionalProperties: false,
    skipTypeCheck: true,
    sortProps: true,
    jsDoc: "extended",
  });

  for (const target of schemaTargets) {
    const schema = generator.createSchema(target.type);
    const orderedSchema = {
      $schema: schema.$schema,
      $id: target.id,
      ...Object.fromEntries(Object.entries(schema).filter(([key]) => key !== "$schema")),
    };
    await writeFile(
      path.join(outputDirectory, target.output),
      `${JSON.stringify(orderedSchema, null, 2)}\n`,
      "utf8",
    );
  }
}

export const paths = Object.freeze({
  root,
  schemas: path.join(root, "schemas"),
});
