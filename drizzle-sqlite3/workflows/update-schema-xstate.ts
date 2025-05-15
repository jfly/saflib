import { fromPromise, raise, setup } from "xstate";
import {
  workflowActionImplementations,
  workflowActors,
  logInfo,
  type WorkflowContext,
  generateMigrations,
  logError,
  promptAgent,
  XStateWorkflow,
} from "@saflib/workflows";
import path from "path";
import { existsSync } from "fs";

interface UpdateSchemaWorkflowInput {}

interface UpdateSchemaWorkflowContext extends WorkflowContext {
  docPath: string;
}

export const UpdateSchemaWorkflowMachine = setup({
  types: {
    input: {} as UpdateSchemaWorkflowInput,
    context: {} as UpdateSchemaWorkflowContext,
  },
  actions: workflowActionImplementations,
  actors: workflowActors,
}).createMachine({
  id: "update-schema",
  description: "Update drizzle/sqlite3 schema.",
  initial: "getOriented",
  context: (_) => {
    const refDoc = path.resolve(import.meta.dirname, "../docs/02-schema.md");
    const refDocAbsPath = path.resolve(process.cwd(), refDoc);
    if (!existsSync(refDocAbsPath)) {
      throw new Error(`Reference documentation not found: ${refDocAbsPath}`);
    }
    return {
      docPath: refDocAbsPath,
      loggedLast: false,
      systemPrompt: `You are updating the schema of a database built off the @saflib/drizzle-sqlite3 package. This includes following best practices and generating migration files.`,
    };
  },
  entry: logInfo("Successfully began workflow"),
  states: {
    getOriented: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(
              "First, read the project spec and also the reference documentation for the @saflib/drizzle-sqlite3 package. If they haven't already, ask the user for the project spec.",
            ),
            promptAgent(
              ({ context }) =>
                `Also, read the guidelines for tables and columns in the doc: ${context.docPath}`,
            ),
          ],
        },
        continue: {
          target: "changingSchema",
        },
      },
    },
    changingSchema: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: promptAgent(
            () =>
              `Find the "schema.ts" file in this folder and update it based on the spec.`,
          ),
        },
        continue: {
          target: "generatingMigrations",
        },
      },
    },
    generatingMigrations: {
      on: {
        continue: {
          reenter: true,
          target: "generatingMigrations",
        },
        prompt: {
          actions: promptAgent(
            () =>
              `The migrations failed to generate. Please run "npm run generate" and make sure it succeeds. Check package.json to make sure the command is set up correctly.`,
          ),
        },
      },
      invoke: {
        src: fromPromise(generateMigrations),
        onDone: {
          target: "done",
          actions: logInfo(() => `Migrations generated successfully.`),
        },
        onError: {
          actions: [
            logError(() => `Migrations failed to generate.`),
            raise({ type: "prompt" }),
          ],
        },
      },
    },
    done: {
      type: "final",
    },
  },
});

export class UpdateSchemaWorkflow extends XStateWorkflow {
  machine = UpdateSchemaWorkflowMachine;
  description = "Update drizzle/sqlite3 schema.";
  cliArguments = [];
}
