import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const sourceDirectory = path.join(root, "src");
const sourceFiles = (await readdir(sourceDirectory, { recursive: true }))
  .filter((entry) => entry.endsWith(".ts"))
  .map((entry) => path.join("src", entry));
const errors = [];
const forbiddenWireNames = new Set(["flags", "estimates"]);
const forbiddenSyntax = new Set([
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.CallSignature,
  ts.SyntaxKind.ConstructSignature,
  ts.SyntaxKind.FunctionType,
]);

for (const relativePath of sourceFiles) {
  const absolutePath = path.join(root, relativePath);
  const text = await readFile(absolutePath, "utf8");
  const source = ts.createSourceFile(absolutePath, text, ts.ScriptTarget.Latest, true);

  function visit(node) {
    if (forbiddenSyntax.has(node.kind)) {
      errors.push(`${relativePath}:${source.getLineAndCharacterOfPosition(node.pos).line + 1} contains non-data contract syntax ${ts.SyntaxKind[node.kind]}.`);
    }

    if (ts.isImportDeclaration(node)) {
      const moduleName = node.moduleSpecifier.getText(source).replaceAll(/["']/g, "");
      const importClause = node.importClause;
      const namedBindings = importClause?.namedBindings;
      const onlyTypeSpecifiers = namedBindings !== undefined &&
        ts.isNamedImports(namedBindings) &&
        namedBindings.elements.every((element) => element.isTypeOnly);
      if (!moduleName.startsWith(".") || (!importClause?.isTypeOnly && !onlyTypeSpecifiers)) {
        errors.push(`${relativePath}:${source.getLineAndCharacterOfPosition(node.pos).line + 1} has a runtime or external import; Spec contracts may only use relative type imports.`);
      }
    }

    if (ts.isPropertySignature(node) && node.name) {
      const name = node.name.getText(source).replaceAll(/["']/g, "");
      if (forbiddenWireNames.has(name)) {
        errors.push(`${relativePath}:${source.getLineAndCharacterOfPosition(node.pos).line + 1} declares forbidden legacy wire field ${name}.`);
      }
      if (/[A-Z]/.test(name)) {
        errors.push(`${relativePath}:${source.getLineAndCharacterOfPosition(node.pos).line + 1} declares non-snake_case wire field ${name}.`);
      }
      if (name === "meta" && !node.type?.getText(source).includes("Record<string, any>")) {
        errors.push(`${relativePath}:${source.getLineAndCharacterOfPosition(node.pos).line + 1} must type meta as opaque Record<string, any>.`);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(source);
}

if (errors.length > 0) {
  throw new Error(`Spec boundary violations:\n${errors.join("\n")}`);
}

console.log("Spec source boundaries are valid.");
