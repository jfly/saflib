import { describe, expect, it } from "vitest";
import { AddWorkflow } from "./add-workflow.ts";
import { dryRunWorkflow } from "@saflib/workflows";

describe("add-workflow", () => {
  it("should successfully dry run", async () => {
    const result = await dryRunWorkflow(AddWorkflow);
    expect(result.checklist).toBeDefined();
  });
});
