import {
  CopyStepMachine,
  UpdateStepMachine,
  PromptStepMachine,
  TestStepMachine,
  defineWorkflow,
  step,
} from "@saflib/workflows";
import path from "node:path";

const sourceDir = path.join(import.meta.dirname, "inits");

const input = [
  {
    name: "name",
    description:
      "The name of the database package to create (e.g., 'user-db' or 'analytics-db')",
    exampleValue: "example-db",
  },
] as const;

interface InitWorkflowContext {
  name: string;
  targetDir: string;
  packageName: string;
}

export const InitWorkflowDefinition = defineWorkflow<
  typeof input,
  InitWorkflowContext
>({
  id: "drizzle/init",

  description:
    "Create a new database package following the @saflib/drizzle structure and conventions",

  input,

  sourceUrl: import.meta.url,

  context: ({ input }) => {
    const targetDir = path.join(process.cwd(), input.name);
    const packageName = `@saflib/${input.name}`;

    return {
      name: input.name,
      targetDir,
      packageName,
    };
  },

  templateFiles: {
    packageJson: path.join(sourceDir, "package.json"),
    drizzleConfig: path.join(sourceDir, "drizzle.config.ts"),
    schema: path.join(sourceDir, "schema.ts"),
    instances: path.join(sourceDir, "instances.ts"),
    errors: path.join(sourceDir, "errors.ts"),
    types: path.join(sourceDir, "types.ts"),
    index: path.join(sourceDir, "index.ts"),
    tsconfig: path.join(sourceDir, "tsconfig.json"),
    vitestConfig: path.join(sourceDir, "vitest.config.js"),
    gitignore: path.join(sourceDir, ".gitignore"),
  },

  docFiles: {
    overview: path.join(import.meta.dirname, "../docs/01-overview.md"),
  },

  steps: [
    step(CopyStepMachine, ({ context }) => ({
      name: context.name,
      targetDir: context.targetDir,
    })),

    step(UpdateStepMachine, ({ context }) => ({
      fileId: "packageJson",
      promptMessage: `Please update **package.json** with the correct package name "${context.packageName}" and any specific dependencies needed for this database package.`,
    })),

    step(UpdateStepMachine, ({ context }) => ({
      fileId: "schema",
      promptMessage: `Please update **schema.ts** to define the database tables and types for the ${context.name} database. Replace the example table with actual tables needed for this service.`,
    })),

    step(UpdateStepMachine, ({ context }) => ({
      fileId: "types",
      promptMessage: `Please update **types.ts** to export the appropriate types for the ${context.name} database, including any custom types derived from the schema.`,
    })),

    step(UpdateStepMachine, ({ context }) => ({
      fileId: "errors",
      promptMessage: `Please update **errors.ts** to define the specific error classes for the ${context.name} database. Replace the example errors with actual errors that might occur in this database.`,
    })),

    step(UpdateStepMachine, ({ context }) => ({
      fileId: "index",
      promptMessage: `Please update **index.ts** to properly export the database interface, types, and errors for the ${context.name} database package.`,
    })),

    step(PromptStepMachine, ({ context }) => ({
      promptText: `The ${context.name} database package has been created with the basic structure. You should now:

1. Create a \`queries/\` directory with domain-specific query files
2. Create a \`migrations/\` directory for database migrations  
3. Create a \`data/\` directory with a \`.gitkeep\` file
4. Run \`npm run generate\` to create initial migrations
5. Add any additional configuration or setup needed

The package follows the @saflib/drizzle conventions as documented in the overview.`,
    })),
  ],
});
