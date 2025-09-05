// Entry point for @tools/workflows
import type { ConcreteWorkflowRunner } from "@saflib/workflows";
import metaWorkflows from "@saflib/workflows/workflows";
import processWorkflows from "@saflib/processes/workflows";
import drizzleWorkflows from "@saflib/drizzle/workflows";
import openapiWorkflows from "@saflib/openapi/workflows";
import monorepoWorkflows from "@saflib/monorepo/workflows";
import vueSpaWorkflows from "@saflib/vue/workflows";
import expressWorkflows from "@saflib/express/workflows";
import emailWorkflows from "@saflib/email/workflows";
import envWorkflows from "@saflib/env/workflows";
import commanderWorkflows from "@saflib/commander/workflows";

const workflowClasses: ConcreteWorkflowRunner[] = [
  ...metaWorkflows,
  ...monorepoWorkflows,
  ...processWorkflows,
  ...drizzleWorkflows,
  ...openapiWorkflows,
  ...expressWorkflows,
  ...vueSpaWorkflows,
  ...emailWorkflows,
  ...envWorkflows,
  ...commanderWorkflows,
];

export const workflows = workflowClasses;
