export const schemaTargets = Object.freeze([
  Object.freeze({
    type: "ProductDefinition",
    source: "src/product-definition.ts",
    output: "product-definition.schema.json",
    id: "https://schemas.elqora.com/dgp/v1/product-definition.schema.json",
  }),
  Object.freeze({
    type: "BrowserJavaScriptExpression",
    source: "src/expression.ts",
    output: "browser-javascript-expression.schema.json",
    id: "https://schemas.elqora.com/dgp/v1/browser-javascript-expression.schema.json",
  }),
  Object.freeze({
    type: "HandlerService",
    source: "src/service.ts",
    output: "handler-service.schema.json",
    id: "https://schemas.elqora.com/dgp/v1/handler-service.schema.json",
  }),
  Object.freeze({
    type: "ServiceCapability",
    source: "src/service.ts",
    output: "service-capability.schema.json",
    id: "https://schemas.elqora.com/dgp/v1/service-capability.schema.json",
  }),
  Object.freeze({
    type: "ProductDefinitionDiagnostic",
    source: "src/diagnostic.ts",
    output: "product-definition-diagnostic.schema.json",
    id: "https://schemas.elqora.com/dgp/v1/product-definition-diagnostic.schema.json",
  }),
  Object.freeze({
    type: "ProductDefinitionValidationResult",
    source: "src/diagnostic.ts",
    output: "product-definition-validation-result.schema.json",
    id: "https://schemas.elqora.com/dgp/v1/product-definition-validation-result.schema.json",
  }),
]);
