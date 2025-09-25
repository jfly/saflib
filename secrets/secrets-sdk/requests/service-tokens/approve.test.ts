import { describe, it, expect, assert } from "vitest";
import { useApproveServiceToken } from "./approve.ts";
import { secretsServiceFakeHandlers } from "../../fakes.ts";
import { withVueQuery } from "@saflib/sdk/testing";
import { setupMockServer } from "@saflib/sdk/testing/mock";

describe("approveServiceToken", () => {
  setupMockServer(secretsServiceFakeHandlers);

  it("should approve a service token", async () => {
    const [mutation, app] = withVueQuery(() => useApproveServiceToken());

    const approveData = {
      id: "token-1",
      approved: true,
      reason: "Approved for testing",
    };

    await mutation.mutateAsync(approveData);

    expect(mutation.data).toBeDefined();
    const data = mutation.data?.value;
    assert(data);
    expect(data).toMatchObject({
      id: "token-1",
      service_name: "test-service-1",
      service_version: "1.0.0",
      approved: true,
      approved_by: "admin@example.com",
    });

    app.unmount();
  });

  it("should deny a service token", async () => {
    const [mutation, app] = withVueQuery(() => useApproveServiceToken());

    const denyData = {
      id: "token-1",
      approved: false,
      reason: "Denied for security reasons",
    };

    await mutation.mutateAsync(denyData);

    expect(mutation.data).toBeDefined();
    const data = mutation.data?.value;
    assert(data);
    expect(data).toMatchObject({
      id: "token-1",
      service_name: "test-service-1",
      service_version: "1.0.0",
      approved: false,
      approved_by: "admin@example.com",
    });

    app.unmount();
  });
});
