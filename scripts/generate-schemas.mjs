import { generateSchemas, paths } from "./schema-lib.mjs";

await generateSchemas(paths.schemas);
console.log(`Generated schemas in ${paths.schemas}`);
