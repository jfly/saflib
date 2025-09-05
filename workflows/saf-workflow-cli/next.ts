import type { Command } from "commander";
import { loadWorkflow, saveWorkflow } from "./file-io.ts";
import { addNewLinesToString } from "@saflib/utils";
import type { WorkflowDefinition } from "../core/types.ts";

export const addNextCommand = (
  program: Command,
  workflows: WorkflowDefinition[],
) => {
  program
    .command("next")
    .description(
      addNewLinesToString(
        "Try to go to the next step of the current workflow.",
      ),
    )
    .action(async () => {
      const workflow = loadWorkflow(workflows);
      if (!workflow) {
        console.log("No workflow found");
        process.exit(1);
      }
      await workflow.goToNextStep();
      saveWorkflow(workflow);
    });
};
