import {
  CopyStepMachine,
  CommandStepMachine,
  defineWorkflow,
  step,
  parsePath,
  parsePackageName,
  makeLineReplace,
  type ParsePathOutput,
  type ParsePackageNameOutput,
} from "@saflib/workflows";
import path from "node:path";

const sourceDir = path.join(import.meta.dirname, "client-templates");

const input = [
  {
    name: "name",
    description:
      "The name of the gRPC client package to create (e.g., 'identity-rpcs' or 'secrets-rpcs')",
    exampleValue: "example-rpcs",
  },
  {
    name: "path",
    description:
      "The path to the target directory for the gRPC client package (e.g., './identity/identity-rpcs')",
    exampleValue: "./identity/identity-rpcs",
  },
] as const;

interface InitClientWorkflowContext
  extends ParsePathOutput,
    ParsePackageNameOutput {}

export const InitClientWorkflowDefinition = defineWorkflow<
  typeof input,
  InitClientWorkflowContext
>({
  id: "grpc/init-client",

  description: "Initialize a new gRPC client package",

  checklistDescription: ({ packageName, targetDir }) =>
    `Create the ${packageName} gRPC client package at ${targetDir}`,

  input,

  sourceUrl: import.meta.url,

  context: ({ input }) => {
    return {
      ...parsePackageName(input.name, {
        requiredSuffix: "-rpcs",
      }),
      ...parsePath(input.path, {
        requiredSuffix: "",
        cwd: input.cwd,
        requiredPrefix: "./",
      }),
    };
  },

  templateFiles: {
    packageJson: path.join(sourceDir, "package.json"),
    index: path.join(sourceDir, "index.ts"),
    env: path.join(sourceDir, "env.ts"),
    healthIndex: path.join(sourceDir, "rpcs/health/index.ts"),
    healthFake: path.join(sourceDir, "rpcs/health/get-health.fake.ts"),
  },

  // TODO: add documentation file references
  docFiles: {},

  steps: [
    step(CopyStepMachine, ({ context }) => ({
      name: "",
      targetDir: context.targetDir,
      lineReplace: makeLineReplace(context),
    })),

    step(CommandStepMachine, () => ({
      command: "npm",
      args: ["install"],
      description: "Install dependencies for the gRPC client package.",
    })),

    step(CommandStepMachine, () => ({
      command: "npm",
      args: ["exec", "saf-env", "generate"],
      description: "Generate environment configuration files.",
    })),

    step(CommandStepMachine, () => ({
      command: "npm",
      args: ["run", "typecheck"],
      description:
        "Run TypeScript type checking to ensure all types are correct.",
    })),
  ],
});
