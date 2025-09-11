import { describe, expect, it } from "vitest";
import { AddHandlerWorkflowDefinition } from "./add-handler.ts";
import { dryRunWorkflow } from "@saflib/workflows";

describe("express/add-handler", () => {
  it("should successfully dry run", async () => {
    const result = await dryRunWorkflow(AddHandlerWorkflowDefinition);
    expect(result.checklist).toBeDefined();
  });
});
