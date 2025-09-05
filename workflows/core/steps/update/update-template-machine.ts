import { assign, raise, setup } from "xstate";
import type {
  WorkflowContext,
  WorkflowInput,
  WorkflowOutput,
} from "../../types.ts";
import {
  promptAgent,
  workflowActions,
  logError,
  workflowActors,
} from "../../xstate.ts";
import { readFileSync } from "node:fs";
import path from "node:path";
import { contextFromInput } from "../../utils.ts";

/**
 * Input for the UpdateStepMachine.
 */
export interface UpdateStepInput {
  /**
   * The id of the file the user is expected to update. Must match one of the keys in the `templateFiles` property for the workflow.
   */
  fileId: string;

  /**
   * The message to show to the user. The machine will then stop until the workflow is continued.
   */
  promptMessage: string | ((context: WorkflowContext) => string);
}

export interface UpdateStepContext extends WorkflowContext {
  filePath: string;
  promptMessage: string | ((context: WorkflowContext) => string);
}

/**
 * Prompts the agent to update one of the templateFiles that was copied over by the CopyStepMachine.
 */
export const UpdateStepMachine = setup({
  types: {
    output: {} as WorkflowOutput,
    input: {} as UpdateStepInput & WorkflowInput,
    context: {} as UpdateStepContext,
  },
  actions: {
    ...workflowActions,
  },
  actors: {
    ...workflowActors,
  },
}).createMachine({
  id: "update-step",
  initial: "update",
  context: ({ input }) => {
    const filePath = input.copiedFiles![input.fileId];
    return {
      ...contextFromInput(input),
      filePath,
      promptMessage: input.promptMessage,
    };
  },
  states: {
    update: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(({ context }) => {
              return typeof context.promptMessage === "string"
                ? context.promptMessage
                : context.promptMessage(context);
            }),
          ],
        },
        continue: [
          {
            guard: ({ context }) => {
              if (context.dryRun) {
                return false;
              }
              const resolvedPath = context.filePath;
              const content = readFileSync(resolvedPath, "utf-8");
              const hasTodos = /\s*(?:#|\/\/).*todo/i.test(content);
              return hasTodos;
            },
            actions: [
              logError(({ context }) => {
                const filePathStr = path.basename(context.filePath);
                return `File ${filePathStr} was not properly updated - it still contains TODO strings. Please complete the implementation. If it's unclear what needs to be done, ask for help.`;
              }),
            ],
          },
          {
            target: "done",
            actions: [
              assign({
                checklist: ({ context }) => {
                  // const filePathStr = path.basename(context.filePath);
                  const promptMessage =
                    typeof context.promptMessage === "string"
                      ? context.promptMessage
                      : context.promptMessage(context);
                  return [
                    ...context.checklist,
                    {
                      // description: `Update ${filePathStr} to remove TODOs`,
                      description: promptMessage.split("\n")[0],
                    },
                  ];
                },
              }),
            ],
          },
        ],
      },
    },
    done: {
      type: "final",
    },
  },
  output: ({ context }) => {
    return {
      checklist: context.checklist,
    };
  },
}) as any; // TODO: fix this
