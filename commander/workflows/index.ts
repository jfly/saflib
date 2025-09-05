import { AddCLIWorkflowDefinition } from "./add-cli.ts";
import { AddCommandWorkflowDefinition } from "./add-command.ts";
import type { WorkflowDefinition } from "@saflib/workflows";

const workflowDefinitions: WorkflowDefinition[] = [
  AddCLIWorkflowDefinition,
  AddCommandWorkflowDefinition,
];

export default workflowDefinitions;
