import {
  CopyStepMachine,
  defineWorkflow,
  step,
  makeWorkflowMachine,
  CommandStepMachine,
  CwdStepMachine,
} from "@saflib/workflows";
import path from "node:path";
import { InitWorkflowDefinition as DrizzleInitWorkflowDefinition } from "@saflib/drizzle/workflows";
import { InitWorkflowDefinition as ExpressInitWorkflowDefinition } from "@saflib/express/workflows";
import { InitWorkflowDefinition as OpenapiInitWorkflowDefinition } from "@saflib/openapi/workflows";
import { InitCommonWorkflowDefinition } from "./init-common.ts";
import { getCurrentPackageName } from "@saflib/dev-tools";

const sourceDir = path.join(import.meta.dirname, "service-templates");

const input = [
  {
    name: "path",
    description:
      "The path to the target directory for the service package (e.g., './services/example')",
    exampleValue: "./services/example",
  },
] as const;

interface InitWorkflowContext {
  serviceName: string;
  targetDir: string;
  packageName: string;
  dbPackageName: string;
  httpPackageName: string;
  specPackageName: string;
  serviceGroupDir: string;
  packagePrefix: string;
}

export const InitWorkflowDefinition = defineWorkflow<
  typeof input,
  InitWorkflowContext
>({
  id: "service/init",

  description:
    "Create a new complete service package with database, HTTP server, API spec, and service orchestration",

  checklistDescription: ({ serviceName }) =>
    `Create a new ${serviceName} service package with all components.`,

  input,

  sourceUrl: import.meta.url,

  context: ({ input }) => {
    let serviceName = path.basename(input.path);
    if (serviceName.endsWith("-service")) {
      serviceName = serviceName.slice(0, -8);
    }
    const targetDir = path.join(
      input.cwd,
      input.path,
      serviceName + "-service",
    );
    const currentPackageName = getCurrentPackageName();
    let orgString = "";
    if (
      currentPackageName.startsWith("@") &&
      currentPackageName.includes("/")
    ) {
      orgString = currentPackageName.split("/")[0] + "/";
    }
    const packagePrefix = `${orgString}${serviceName}-`;
    const packageName = `${packagePrefix}service`;
    const dbPackageName = `${packagePrefix}db`;
    const httpPackageName = `${packagePrefix}http`;
    const specPackageName = `${packagePrefix}spec`;

    return {
      serviceName,
      targetDir,
      serviceGroupDir: input.path,
      packageName,
      dbPackageName,
      httpPackageName,
      specPackageName,
      packagePrefix,
    };
  },

  templateFiles: {
    packageJson: path.join(sourceDir, "package.json"),
    tsconfig: path.join(sourceDir, "tsconfig.json"),
    vitestConfig: path.join(sourceDir, "vitest.config.js"),
    dockerfile: path.join(sourceDir, "Dockerfile.template"),
    runScript: path.join(sourceDir, "run.ts"),
    envSchema: path.join(sourceDir, "env.schema.combined.json"),
  },

  docFiles: {},

  steps: [
    // openapi
    step(makeWorkflowMachine(OpenapiInitWorkflowDefinition), ({ context }) => ({
      name: context.specPackageName,
      path: path.join(context.serviceGroupDir, `${context.serviceName}-spec`),
    })),

    // drizzle
    step(makeWorkflowMachine(DrizzleInitWorkflowDefinition), ({ context }) => ({
      name: context.dbPackageName,
      path: path.join(context.serviceGroupDir, `${context.serviceName}-db`),
    })),

    // common
    step(makeWorkflowMachine(InitCommonWorkflowDefinition), ({ context }) => ({
      path: context.serviceGroupDir,
    })),

    // express
    step(makeWorkflowMachine(ExpressInitWorkflowDefinition), ({ context }) => ({
      name: context.httpPackageName,
      path: path.join(context.serviceGroupDir, `${context.serviceName}-http`),
    })),

    // service itself
    step(CopyStepMachine, ({ context }) => ({
      name: context.serviceName,
      targetDir: context.targetDir,
      lineReplace: (line) => {
        return line.replace("@template/file-", context.packagePrefix);
      },
    })),

    // generate env
    step(CwdStepMachine, ({ context }) => ({
      path: context.targetDir,
    })),
    step(CommandStepMachine, () => ({
      command: "npm",
      args: ["exec", "saf-env", "generate", "--", "-c"],
    })),

    step(CommandStepMachine, () => ({
      command: "npm",
      args: ["install"],
    })),

    // Install dependencies for the HTTP package
    step(CwdStepMachine, ({ context }) => ({
      path: path.join(context.targetDir, "..", `${context.serviceName}-http`),
    })),

    step(CommandStepMachine, () => ({
      command: "npm",
      args: ["install"],
    })),
  ],
});
