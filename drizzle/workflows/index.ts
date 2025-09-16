import { AddQueryWorkflowDefinition } from "./add-query.ts";
import { UpdateSchemaWorkflowDefinition } from "./update-schema.ts";
import { DrizzleInitWorkflowDefinition } from "./init.ts";
import type { WorkflowDefinition } from "@saflib/workflows";

const workflowDefinitions: WorkflowDefinition[] = [
  UpdateSchemaWorkflowDefinition,
  AddQueryWorkflowDefinition,
  DrizzleInitWorkflowDefinition,
];

export {
  AddQueryWorkflowDefinition,
  UpdateSchemaWorkflowDefinition,
  DrizzleInitWorkflowDefinition,
};

export default workflowDefinitions;
