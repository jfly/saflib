import { AddHandlerWorkflowDefinition } from "./add-handler.ts";
import { InitWorkflowDefinition } from "./init.ts";
import type { WorkflowDefinition } from "@saflib/workflows";

export { AddHandlerWorkflowDefinition, InitWorkflowDefinition };

const workflowDefinitions: WorkflowDefinition[] = [
  AddHandlerWorkflowDefinition,
  InitWorkflowDefinition,
];

export default workflowDefinitions;
