import { describe, it, expect } from "vitest";
import { AddSpaPageWorkflowMachine } from "./add-spa-page.ts";
import { createActor, waitFor } from "xstate";
import { allSettled, continueWorkflow } from "../../workflows/src/utils.ts";

describe("add-spa-page", () => {
  it("should create a new page", async () => {
    const actor = createActor(AddSpaPageWorkflowMachine, {
      input: {
        name: "test-page",
        dryRun: true,
      },
    });
    actor.start();
    await waitFor(actor, allSettled);
    let lastStateName = "";
    while (actor.getSnapshot().status !== "done") {
      continueWorkflow(actor);
      await waitFor(actor, allSettled);
      const currentStateName = actor.getSnapshot().value;
      if (currentStateName === lastStateName) {
        throw new Error(`Workflow is stuck on state ${currentStateName}.`);
      }
      lastStateName = currentStateName;
    }
    console.log("Last value", actor.getSnapshot().value);
    // expect(actor.getSnapshot().value).toBe("done");
  });
});
