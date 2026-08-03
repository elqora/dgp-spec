import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { generateSchemas, paths } from "./schema-lib.mjs";

const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "dgp-spec-schemas-"));

try {
  await generateSchemas(temporaryDirectory);
  const expectedFiles = (await readdir(temporaryDirectory)).sort();
  const committedFiles = (await readdir(paths.schemas)).sort();

  if (JSON.stringify(expectedFiles) !== JSON.stringify(committedFiles)) {
    throw new Error("Committed schema file set differs from generated output. Run npm run generate.");
  }

  for (const filename of expectedFiles) {
    const generated = await readFile(path.join(temporaryDirectory, filename), "utf8");
    const committed = await readFile(path.join(paths.schemas, filename), "utf8");
    if (generated !== committed) {
      throw new Error(`${filename} has drifted from canonical TypeScript. Run npm run generate.`);
    }
  }
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}

console.log("Committed JSON Schemas match canonical TypeScript.");
