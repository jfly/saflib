import { InitWorkflowDefinition } from "./init.ts";
import type { WorkflowDefinition } from "@saflib/workflows";

export {
  // Export each workflow definition separately
  InitWorkflowDefinition,
};

const workflowDefinitions: WorkflowDefinition[] = [
  // And have the default export be the array of all of them
  InitWorkflowDefinition,
];
export default workflowDefinitions;
