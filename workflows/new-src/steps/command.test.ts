import { describe, it, expect } from "vitest";
import { CommandStepMachine } from "./command.ts";
import { createActor, waitFor } from "xstate";

describe("CommandStepMachine", () => {
  it("should run a command in dry run mode", async () => {
    const actor = createActor(CommandStepMachine, {
      input: {
        command: "echo",
        args: ["hello", "world"],
        dryRun: true,
      },
    });
    actor.start();
    await waitFor(actor, (state) => state.matches("done"));
    expect(actor.getSnapshot().status).toBe("done");
  });

  it("should run a simple echo command", async () => {
    const actor = createActor(CommandStepMachine, {
      input: {
        command: "echo",
        args: ["test"],
        dryRun: false,
      },
    });
    actor.start();
    await waitFor(actor, (state) => state.matches("done"));
    expect(actor.getSnapshot().status).toBe("done");
  });

  it("should handle command without args", async () => {
    const actor = createActor(CommandStepMachine, {
      input: {
        command: "pwd",
        dryRun: true,
      },
    });
    actor.start();
    await waitFor(actor, (state) => state.matches("done"));
    expect(actor.getSnapshot().status).toBe("done");
  });
});
