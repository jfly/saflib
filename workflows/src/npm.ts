import { assign, fromPromise } from "xstate";
import {
  logInfo,
  promptAgent,
  runCommandAsync,
  type WorkflowInput,
  type WorkflowContext,
  type ComposerFunctionOptions,
} from "./xstate.ts";

/**
 * Options for the runNpmCommandComposer function.
 */
export interface RunNpmCommandFactoryOptions extends ComposerFunctionOptions {
  // All commands here are the only ones that can be run by a workflow.
  command: string;
  stateName: string;
  nextStateName: string;
}

const allowedPrefixes = ["install", "exec saf-", "run"];

/**
 * Composer for running npm commands.
 */
export function runNpmCommandComposer({
  command,
  stateName,
  nextStateName,
}: RunNpmCommandFactoryOptions) {
  if (!allowedPrefixes.some((prefix) => command.startsWith(prefix))) {
    throw new Error(`Invalid command: ${command}`);
  }

  const getCommand = () => {
    return () => {
      return runCommandAsync("npm", command.split(" "));
    };
  };

  const getSuccessMessage = () => {
    return `Successfully ran ${command}`;
  };

  return {
    [stateName]: {
      invoke: {
        input: ({ context }: { context: WorkflowContext }) => context,
        src: fromPromise(
          async ({ input }: { input: WorkflowInput }): Promise<string> => {
            if (input.dryRun) {
              return "Dry run";
            }
            return await getCommand()();
          },
        ),
        onDone: {
          target: nextStateName,
          actions: logInfo(() => getSuccessMessage()),
        },
      },
      entry: assign({
        checklist: ({ context }: { context: WorkflowContext }) => [
          ...context.checklist,
          {
            description: `Run \`npm ${command}\``,
          },
        ],
      }),
      on: {
        prompt: {
          actions: promptAgent(
            () =>
              `The ${command} command failed. Please fix the issues and continue.`,
          ),
        },
        continue: {
          reenter: true,
          target: stateName,
        },
      },
    },
  };
}
