import { setup } from "xstate";
import {
  workflowActions,
  workflowActors,
  promptAgent,
  logInfo,
} from "../xstate.ts";
import {
  type WorkflowContext,
  type WorkflowInput,
} from "../types.ts";
import { sendTo, raise } from "xstate";
import { contextFromInput } from "../../saf-workflow-cli/workflow.ts";

/**
 * Input for the PromptStepMachine.
 */
export interface PromptStepInput {
  /**
   * The text to be shown to the agent or user. The machine will then stop until the workflow is continued.
   */
  promptText: string;
}

interface PromptStepContext extends WorkflowContext {
  promptText: string;
}

/**
 * Prompts the agent or user to do something. Stops the workflow until the workflow is continued.
 */
export const PromptStepMachine = setup({
  types: {
    input: {} as PromptStepInput & WorkflowInput,
    context: {} as PromptStepContext,
  },
  actions: {
    ...workflowActions,
  },
  actors: {
    ...workflowActors,
  },
}).createMachine({
  id: "prompt-step",
  context: ({ input }) => ({
    ...contextFromInput(input),
    promptText: input.promptText,
  }),
  initial: "running",
  states: {
    running: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(({ context }) => context.promptText),
            sendTo(({ context }) => context.rootRef, { type: "halt" }),
          ],
        },
        continue: {
          actions: [logInfo("Continuing...")],
          target: "done",
        },
      },
    },
    done: {
      type: "final",
    },
  },
  output: ({ context }) => {
    return {
      checklist: [
        {
          description: context.promptText.split("\n")[0],
        },
      ],
    }
  },
});
