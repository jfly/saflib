import { fromPromise, raise } from "xstate";
import {
  logInfo,
  logError,
  promptAgent,
  runCommandAsync,
  type WorkflowInput,
  type WorkflowContext,
} from "./xstate.ts";

interface RunNpmCommandFactoryOptions {
  // All commands here are the only ones that can be run by a workflow.
  command:
    | "install @saflib/env"
    | "exec saf-env generate"
    | "exec saf-env generate-all";
  stateName: string;
  nextStateName: string;
}

export function runNpmCommandFactory({
  command,
  stateName,
  nextStateName,
}: RunNpmCommandFactoryOptions) {
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
              console.log("Dry run npm command", command);
              return "Dry run";
            }
            return await getCommand()();
          },
        ),
        onDone: {
          target: nextStateName,
          actions: logInfo(() => getSuccessMessage()),
        },
        onError: {
          actions: [
            logError(
              ({ event }) =>
                `Command failed: ${(event.error as Error).message}`,
            ),
            raise({ type: "prompt" }),
          ],
        },
      },
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
