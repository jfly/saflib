import {
  buildMonorepoContext,
  getCurrentPackageName,
  getAllPackageWorkspaceDependencies,
} from "@saflib/dev-tools";
import type { JSONSchema4 } from "json-schema";
import { readFileSync } from "fs";
import { existsSync } from "fs";
import path from "path";
import { compile } from "json-schema-to-typescript";

type JSONSchemaStringSchema = JSONSchema4 & {
  type: "string";
  source: string;
};

interface SimplifiedJSONSchema {
  type: "object";
  properties: Record<string, JSONSchemaStringSchema>;
  required?: string[];
  additionalProperties: false;
}

export const getCombinedEnvSchema = async () => {
  const context = buildMonorepoContext();

  const currentPackageName = getCurrentPackageName();

  const allDependencies = getAllPackageWorkspaceDependencies(
    currentPackageName,
    context,
  );

  const allPackageNames = Array.from(allDependencies).concat([
    currentPackageName,
  ]);

  const allEnvSchemas: JSONSchema4[] = allPackageNames
    .map((dependency) => {
      const packagePath = context.monorepoPackageDirectories[dependency];
      const envSchemaPath = path.join(packagePath, "env.schema.json");
      if (!existsSync(envSchemaPath)) {
        return null;
      }
      const schema = JSON.parse(
        readFileSync(envSchemaPath, "utf-8"),
      ) as JSONSchema4;
      schema.source = dependency;
      return schema;
    })
    .filter((schema) => schema !== null);

  const combinedSchema: SimplifiedJSONSchema = {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false,
  };

  allEnvSchemas.forEach((schema: JSONSchema4) => {
    if (schema.type !== "object") {
      throw new Error("Schema is not an object");
    }
    if (schema.properties === undefined) {
      return;
    }
    const simplifiedSchema = schema as SimplifiedJSONSchema;
    Object.entries(simplifiedSchema.properties).forEach(([key, value]) => {
      if (combinedSchema.properties[key] !== undefined) {
        if (
          JSON.stringify(combinedSchema.properties[key]) !==
          JSON.stringify(value)
        ) {
          throw new Error(`Property ${key} is defined in multiple schemas`);
        }
        return;
      }
      combinedSchema.properties[key] = JSON.parse(JSON.stringify(value));
      combinedSchema.properties[key].source = schema.source;
    });
    if (simplifiedSchema.required !== undefined) {
      if (combinedSchema.required === undefined) {
        combinedSchema.required = [];
      }
      combinedSchema.required.push(...simplifiedSchema.required);
    }
  });

  return combinedSchema;
};

export const makeEnvParserSnippet = async (schema: SimplifiedJSONSchema) => {
  const typeSnippet = await compile(schema, "CombinedEnvSchema");

  return `${typeSnippet}
export const typedEnv = process.env as unknown as CombinedEnvSchema;
`;
};
