import type { CreateArgsType, Step, Workflow } from "./types.ts";
import type {
  WorkflowInput,
  WorkflowContext,
  WorkflowOutput,
} from "../src/xstate.ts";
import { workflowActions, workflowActors } from "../src/xstate.ts";
import {
  assign,
  raise,
  setup,
  type AnyStateMachine,
  type InputFrom,
} from "xstate";
import { contextFromInput, outputFromContext } from "../src/workflow.ts";
import type { CLIArgument } from "../src/types.ts";

/**
 * Helper, identity function to infer types.
 *
 * By using this function on a Workflow object, it properly types the input object in the context function, and the context in the callbacks for the steps.
 *
 * I'm keeping this separate just because it's good to have the type inference piece separate where it can be messed with independently.
 */
function defineWorkflow<I extends readonly CLIArgument[], C = any>(config: {
  input: I;
  context: (arg: { input: CreateArgsType<I> }) => C;
  id: string;
  description: string;
  templateFiles: Record<string, string>;
  docFiles: Record<string, string>;
  steps: Array<Step<C, AnyStateMachine>>;
}): Workflow<I, C> {
  return config;
}

/**
 * Implementation of the makeMachineFromWorkflow function.
 */
function _makeWorkflowMachine<I extends readonly CLIArgument[], C>(
  workflow: Workflow<I, C>,
) {
  type Input = CreateArgsType<I> & WorkflowInput;
  type Context = C & WorkflowContext;

  const actors: Record<string, AnyStateMachine> = {};
  for (let i = 0; i < workflow.steps.length; i++) {
    const actor_id = `actor_${i}`;
    const step = workflow.steps[i];
    actors[actor_id] = step.machine;
  }

  const states: Record<string, object> = {};
  for (let i = 0; i < workflow.steps.length; i++) {
    const step = workflow.steps[i];
    const stateName = `step_${i}`;
    states[stateName] = {
      invoke: {
        input: ({ context }: { context: Context }) => {
          return {
            ...step.input({ context }),
            // don't need checklist; the machine will compose their own
            // don't need loggedLast; the machine just tracks that for its own output
            systemPrompt: context.systemPrompt,
            dryRun: context.dryRun,
            rootRef: context.rootRef,
            templateFiles: context.templateFiles,
            copiedFiles: context.copiedFiles,
            docFiles: context.docFiles,
          };
        },
        src: `actor_${i}`,
        onDone: {
          target: `step_${i + 1}`,
          actions: [
            assign({
              checklist: ({ context, event }) => {
                const output: WorkflowOutput = event.output;
                return [...context.checklist, ...output.checklist];
              },
              copiedFiles: ({ context, event }) => {
                const output: WorkflowOutput = event.output;
                if (output.copiedFiles) {
                  return { ...context.copiedFiles, ...output.copiedFiles };
                }
                return context.copiedFiles;
              },
            }),
          ],
        },
      },
    };
  }
  states[`step_${workflow.steps.length}`] = {
    type: "final",
  };

  return setup({
    types: {
      input: {} as Input,
      context: {} as Context,
      output: {} as WorkflowOutput,
    },
    actions: {
      ...workflowActions,
    },
    actors: {
      ...workflowActors,
      ...actors,
    },
  }).createMachine({
    entry: raise({ type: "start" }),
    id: workflow.id,
    description: workflow.description,
    context: ({ input }) => {
      const context: Context = {
        ...workflow.context({ input }),
        ...contextFromInput(input),
        templateFiles: workflow.templateFiles,
        docFiles: workflow.docFiles,
      };
      return context;
    },
    initial: "step_0",
    states,
    output: ({ context }) => outputFromContext({ context }),
  });
}

/**
 * From a Workflow object, create an XState machine.
 *
 * This basically translates my simplified and scoped workflow machine definition to the full XState machine definition.
 */
export const makeWorkflowMachine = <C, I extends readonly CLIArgument[]>(
  config: Workflow<I, C>,
) => {
  return _makeWorkflowMachine(defineWorkflow(config));
};

/**
 * Helper function for defining a step in a workflow, enforcing types properly.
 */
export const step = <C, M extends AnyStateMachine>(
  machine: M,
  input: (arg: { context: C & WorkflowContext }) => InputFrom<M>,
): Step<C, M> => {
  return {
    machine,
    input,
  };
};
