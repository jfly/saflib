import {
  CopyTemplateMachine,
  UpdateStepMachine,
  PromptStepMachine,
  CommandStepMachine,
  makeWorkflowMachine,
  step,
  XStateWorkflow,
  TestStepMachine,
} from "@saflib/workflows";
import path from "node:path";

const sourceDir = path.join(import.meta.dirname, "templates");

const input = [
  {
    name: "name",
    description:
      "The desired package name, including scope (e.g., @your-org/package-name)",
    exampleValue: "@example-org/example-package",
  },
  {
    name: "path",
    description:
      "The RELATIVE path from monorepo root where the package directory (containing package.json) will be created (e.g., packages/my-lib or saflib/node)",
    exampleValue: "packages/my-lib",
  },
] as const;

interface AddTsPackageWorkflowContext {
  name: string;
  targetDir: string;
  packageName: string; // e.g. "@your-org/package-name"
  packageDirName: string; // e.g. "package-name"
  path: string; // Relative path from monorepo root
}

export const AddTsPackageWorkflowMachine = makeWorkflowMachine<
  AddTsPackageWorkflowContext,
  typeof input
>({
  id: "add-ts-package",

  description:
    "Creates a new TypeScript package according to monorepo best practices.",

  input,

  context: ({ input }) => {
    const targetDir = path.join(process.cwd(), input.path);
    const packageDirName = path.basename(input.path);

    return {
      name: input.name,
      targetDir,
      packageName: input.name,
      packageDirName,
      path: input.path,
    };
  },

  templateFiles: {
    packageJson: path.join(sourceDir, "package.json"),
    tsconfig: path.join(sourceDir, "tsconfig.json"),
    index: path.join(sourceDir, "index.ts"),
    test: path.join(sourceDir, "index.test.ts"),
    vitest: path.join(sourceDir, "vitest.config.ts"),
  },

  docFiles: {},

  steps: [
    step(CopyTemplateMachine, ({ context }) => ({
      name: context.packageDirName,
      targetDir: context.targetDir,
    })),

    step(UpdateStepMachine, ({ context }) => ({
      fileId: "packageJson",
      promptMessage: `The file '${path.join(context.path, "package.json")}' has been created. Please update the "description" field and any other fields as needed, such as dependencies on other SAF libraries.`,
    })),

    step(PromptStepMachine, ({ context }) => ({
      promptText: `Ensure the new package path '${context.path}' is included in the "workspaces" array in the root \`package.json\`.
      
      For example: \`"workspaces": ["${context.path}", "other-packages/*"]\``,
    })),

    step(CommandStepMachine, () => ({
      command: "npm",
      args: ["install"],
    })),

    step(TestStepMachine, () => ({
      fileId: "test",
    })),
  ],
});

export class AddTsPackageWorkflow extends XStateWorkflow {
  machine = AddTsPackageWorkflowMachine;
  description =
    "Creates a new TypeScript package according to monorepo best practices.";
  cliArguments = input;
  sourceUrl = import.meta.url;
}
