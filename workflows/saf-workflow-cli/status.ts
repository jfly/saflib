import type { Command } from "commander";
import type { WorkflowDefinition } from "../core/types.ts";
import { addNewLinesToString } from "@saflib/utils";
import { loadWorkflow } from "./file-io.ts";

export const addStatusCommand = (
  program: Command,
  workflows: WorkflowDefinition[],
) => {
  program
    .command("status")
    .description(
      addNewLinesToString("Show the status of the current workflow."),
    )
    .action(async () => {
      const workflow = loadWorkflow(workflows);
      if (!workflow) {
        console.log("No workflow found");
        process.exit(1);
      }
      await workflow.printStatus();
    });
};
