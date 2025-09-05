import { describe, it, expect } from "vitest";
import { AddWorkflowMachine } from "./add-workflow.ts";
import { createActor, waitFor } from "xstate";
import { workflowAllSettled, continueWorkflow } from "@saflib/workflows";

describe("add-workflow", () => {
  it("should create a new workflow", async () => {
    const actor = createActor(AddWorkflowMachine, {
      input: {
        name: "test-workflow",
        dryRun: true,
      },
    });
    actor.start();
    await waitFor(actor, workflowAllSettled);
    let lastStateName = "";
    while (actor.getSnapshot().status !== "done") {
      continueWorkflow(actor);
      await waitFor(actor, workflowAllSettled);
      const currentStateName = actor.getSnapshot().value;
      if (currentStateName === lastStateName) {
        throw new Error(`Workflow is stuck on state ${currentStateName}.`);
      }
      lastStateName = currentStateName;
    }
    expect(actor.getSnapshot().status).toBe("done");
  });
});
