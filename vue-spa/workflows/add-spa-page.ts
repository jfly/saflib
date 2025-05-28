import { fromPromise, raise, setup } from "xstate";
import {
  workflowActionImplementations,
  workflowActors,
  logInfo,
  type WorkflowContext,
  logError,
  promptAgent,
  XStateWorkflow,
  doTestsPass,
  CopyTemplateMachine,
  kebabCaseToPascalCase,
} from "@saflib/workflows";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface AddSpaPageWorkflowInput {
  name: string; // kebab-case, e.g. "welcome-new-user" or "welcome-new-user-page" (either works)
}

interface AddSpaPageWorkflowContext extends WorkflowContext {
  name: string; // kebab-case
  pascalName: string; // PascalCase, e.g. WelcomeNewUserPage
  targetDir: string;
  sourceDir: string;
}

export const AddSpaPageWorkflowMachine = setup({
  types: {
    input: {} as AddSpaPageWorkflowInput,
    context: {} as AddSpaPageWorkflowContext,
  },
  actions: workflowActionImplementations,
  actors: workflowActors,
}).createMachine({
  id: "add-spa-page",
  description:
    "Create a new page in a SAF-powered Vue SPA, using a template and renaming placeholders.",
  initial: "copyAndRenameTemplate",
  context: ({ input }) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceDir = path.join(__dirname, "page-template");

    // Only append "-page" if the name doesn't already end with "-page"
    const pageName = input.name.endsWith("-page")
      ? input.name
      : input.name + "-page";
    const targetDir = path.join(process.cwd(), "pages", pageName);

    return {
      name: pageName,
      pascalName: kebabCaseToPascalCase(pageName),
      targetDir,
      sourceDir,
      loggedLast: false,
    };
  },
  entry: logInfo("Successfully began workflow"),
  states: {
    copyAndRenameTemplate: {
      invoke: {
        input: ({ context }) => ({
          sourceFolder: context.sourceDir,
          targetFolder: context.targetDir,
          name: context.name,
        }),
        src: CopyTemplateMachine,
        onDone: {
          target: "runTests",
          actions: logInfo(
            () => `Template files copied and renamed successfully.`,
          ),
        },
        onError: {
          actions: [
            logError(
              ({ event }) =>
                `Failed to copy and rename template: ${(event.error as Error).message}`,
            ),
            raise({ type: "prompt" }),
          ],
        },
      },
      on: {
        prompt: {
          actions: promptAgent(
            () =>
              "Failed to copy and rename the template files. Please check if the source directory exists and you have the necessary permissions.",
          ),
        },
        continue: {
          reenter: true,
          target: "copyAndRenameTemplate",
        },
      },
    },
    runTests: {
      invoke: {
        src: fromPromise(doTestsPass),
        onDone: {
          target: "updateLoader",
          actions: logInfo(() => `Tests passed successfully.`),
        },
        onError: {
          actions: [
            logError(
              ({ event }) => `Tests failed: ${(event.error as Error).message}`,
            ),
            raise({ type: "prompt" }),
          ],
        },
      },
      on: {
        prompt: {
          actions: promptAgent(
            () => "Tests failed. Please fix the issues and continue.",
          ),
        },
        continue: {
          reenter: true,
          target: "runTests",
        },
      },
    },
    updateLoader: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(
              ({ context }) =>
                `Please update the loader method in ${context.pascalName}.loader.ts to return any necessary Tanstack queries for rendering the page.`,
            ),
          ],
        },
        continue: {
          target: "useLoader",
        },
      },
    },
    useLoader: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(
              ({ context }) =>
                `Please update ${context.pascalName}.vue to take the data from the loader, assert that it's loaded, then render sample the data using Vuetify components. Don't create the UX just yet; focus on making sure the data is loading properly.`,
            ),
          ],
        },
        continue: {
          target: "updatePage",
        },
      },
    },
    updatePage: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(
              ({ context }) =>
                `Please update ${context.pascalName}.vue to match the design. Use Vuetify components and variables instead of custom styles, even if it means the design isn't pixel-perfect. Do NOT set any style tags.`,
            ),
          ],
        },
        continue: {
          target: "updateTests",
        },
      },
    },
    updateTests: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(
              ({ context }) =>
                `Please update ${context.pascalName}.test.ts to mock the server requests and verify that the page renders correctly. Make sure to test all the functionality that was added. Remember to have the test use "getElementByString" in reusable helper methods.`,
            ),
          ],
        },
        continue: {
          target: "updateRouter",
        },
      },
    },
    updateRouter: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(
              ({ context }) =>
                `Please update the router.ts file to include the new page. Add a new route for ${context.name} that uses the ${context.pascalName}Async component. The route should be at "/${context.name}".`,
            ),
          ],
        },
        continue: {
          target: "verifyDone",
        },
      },
    },
    verifyDone: {
      entry: raise({ type: "prompt" }),
      on: {
        prompt: {
          actions: [
            promptAgent(
              () =>
                `Have the human run the website and confirm that the page looks and works as expected.`,
            ),
          ],
        },
        continue: {
          target: "done",
        },
      },
    },
    done: {
      type: "final",
    },
  },
});

export class AddSpaPageWorkflow extends XStateWorkflow {
  machine = AddSpaPageWorkflowMachine;
  description =
    "Create a new page in a SAF-powered Vue SPA, using a template and renaming placeholders.";
  cliArguments = [
    {
      name: "name",
      description:
        "Name of the new page in kebab-case (e.g. 'welcome-new-user' or 'welcome-new-user-page')",
    },
  ];
}
