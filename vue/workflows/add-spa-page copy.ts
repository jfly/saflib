// import { setup } from "xstate";
// import {
//   workflowActions,
//   workflowActors,
//   logInfo,
//   XStateWorkflow,
//   copyTemplateStateComposer,
//   updateTemplateComposer,
//   type TemplateWorkflowContext,
//   runTestsComposer,
//   promptAgentComposer,
//   contextFromInput,
//   type WorkflowInput,
//   outputFromContext,
// } from "@saflib/workflows";
// import { kebabCaseToPascalCase } from "@saflib/utils";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

// interface AddSpaPageWorkflowInput extends WorkflowInput {
//   name: string;
// }

// export const AddSpaPageWorkflowMachine = setup({
//   types: {
//     input: {} as AddSpaPageWorkflowInput,
//     context: {} as TemplateWorkflowContext,
//   },
//   actions: workflowActions,
//   actors: workflowActors,
// }).createMachine({
//   id: "add-spa-page",
//   description:
//     "Create a new page in a SAF-powered Vue SPA, using a template and renaming placeholders.",
//   initial: "copyTemplate",
//   context: ({ input }) => {
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = path.dirname(__filename);
//     const sourceDir = path.join(__dirname, "page-template");

//     // Only append "-page" if the name doesn't already end with "-page"
//     const pageName = input.name.endsWith("-page")
//       ? input.name
//       : input.name + "-page";
//     const targetDir = path.join(process.cwd(), "pages", pageName);

//     return {
//       name: pageName,
//       pascalName: kebabCaseToPascalCase(pageName),
//       targetDir,
//       sourceDir,
//       ...contextFromInput(input),
//     };
//   },
//   entry: logInfo("Successfully began workflow"),
//   states: {
//     // First copy over the files
//     ...copyTemplateStateComposer({
//       stateName: "copyTemplate",
//       nextStateName: "updateLoader",
//     }),

//     // Then for each file, have the agent update it
//     ...updateTemplateComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.loader.ts`),
//       promptMessage: (context) =>
//         `Please update the loader method in ${context.pascalName}.loader.ts to return any necessary Tanstack queries for rendering the page.`,
//       stateName: "updateLoader",
//       nextStateName: "useLoader",
//     }),

//     ...updateTemplateComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.vue`),
//       promptMessage: (context) =>
//         `Please update ${context.pascalName}.vue to take the data from the loader, assert that it's loaded, then render sample the data using Vuetify components. Don't create the UX just yet; focus on making sure the data is loading properly. Do not add any sort of loading state or skeleton; that's the job of the "Async" component.`,
//       stateName: "useLoader",
//       nextStateName: "updateLinksPackage",
//     }),

//     ...promptAgentComposer<TemplateWorkflowContext>({
//       stateName: "updateLinksPackage",
//       nextStateName: "updateRouter",
//       promptForContext: () =>
//         `Find the "links" package adjacent to this package. Add the link for the new page there along with the others.`,
//     }),

//     ...updateTemplateComposer<TemplateWorkflowContext>({
//       filePath: "router.ts",
//       promptMessage: (context) =>
//         `Please update the router.ts file to include the new page. Add a new route for ${context.name} that uses the ${context.pascalName}Async component. Use the link from the shared links package instead of hardcoding the path.`,
//       stateName: "updateRouter",
//       nextStateName: "updateTests",
//     }),

//     ...updateTemplateComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.test.ts`),
//       promptMessage: (context) =>
//         `Please update ${context.pascalName}.test.ts to mock the server requests and verify that the raw data from the loader is rendered correctly.`,
//       stateName: "updateTests",
//       nextStateName: "runTestsOnStubbedPage",
//     }),

//     // Run the tests to make sure the loader and page are basically working
//     ...runTestsComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.test.ts`),
//       stateName: "runTestsOnStubbedPage",
//       nextStateName: "updateStrings",
//     }),

//     ...updateTemplateComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.strings.ts`),
//       promptMessage: (context) =>
//         `Please update ${context.pascalName}.strings.ts to include all text from the design. Use string keys that will work well with the translation system (e.g., 'title', 'subtitle', 'description', etc.).`,
//       stateName: "updateStrings",
//       nextStateName: "updateMainStrings",
//     }),

//     ...promptAgentComposer<TemplateWorkflowContext>({
//       stateName: "updateMainStrings",
//       nextStateName: "implementDesign",
//       promptForContext: () =>
//         `Find the strings.ts file in the root of the package. Add the strings from the file you just updated there.`,
//     }),

//     ...updateTemplateComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.vue`),
//       promptMessage: (context) =>
//         `Please update ${context.pascalName}.vue to match the design and use the translation system. Import and use the "useReverseT" function from the i18n.ts file at the root of the package, and use t(strings.key) instead of strings.key for all text. Use Vuetify components and variables instead of custom styles, even if it means the design isn't pixel-perfect. Do NOT set any style tags.`,
//       stateName: "implementDesign",
//       nextStateName: "updateTestsForDesign",
//     }),

//     ...updateTemplateComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.test.ts`),
//       promptMessage: (context) =>
//         `Please update ${context.pascalName}.test.ts to verify that the page renders correctly with the new design and translation system. Update the helper methods to locate actual key elements of the page, then update the one test to check that they all exist and have the right text. Only use "getElementByString" to locate elements, using the strings from the strings file as the argument.`,
//       stateName: "updateTestsForDesign",
//       nextStateName: "runTestsOnFinishedPage",
//     }),

//     ...runTestsComposer<TemplateWorkflowContext>({
//       filePath: (context) =>
//         path.join(context.targetDir, `${context.pascalName}.test.ts`),
//       stateName: "runTestsOnFinishedPage",
//       nextStateName: "verifyDone",
//     }),

//     ...promptAgentComposer({
//       stateName: "verifyDone",
//       nextStateName: "done",
//       promptForContext: () =>
//         `Have the human run the website and confirm that the page looks and works as expected.`,
//     }),

//     done: {
//       type: "final",
//     },
//   },
//   output: outputFromContext,
// });

// export class AddSpaPageWorkflow extends XStateWorkflow {
//   machine = AddSpaPageWorkflowMachine;
//   description =
//     "Create a new page in a SAF-powered Vue SPA, using a template and renaming placeholders.";
//   cliArguments = [
//     {
//       name: "name",
//       description:
//         "Name of the new page in kebab-case (e.g. 'welcome-new-user')",
//       exampleValue: "example-page",
//     },
//   ];
//   sourceUrl = import.meta.url;
// }
