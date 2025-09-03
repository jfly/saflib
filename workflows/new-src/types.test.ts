import { describe, expect, it } from "vitest";
import { pm } from "./types.ts";
import { createActor, waitFor } from "xstate";
import { allSettled } from "../src/utils.ts";

describe("makeMachineFromWorkflow", () => {
  it("should create a machine from a workflow", async () => {
    const machine = pm;
    expect(machine).toBeDefined();
    const actor = createActor(machine, {
      input: {
        prompt: "What is your name?",
        prompt2: "What is your favorite color?",
      },
    });
    actor.start();
    await waitFor(actor, allSettled);
  });
});
