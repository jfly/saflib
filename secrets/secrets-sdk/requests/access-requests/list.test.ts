import { describe, it, expect, assert } from "vitest";
import { listAccessRequestsQuery } from "./list.ts";
import { secretsServiceFakeHandlers } from "../../fakes.ts";
import { setupMockServer, withVueQuery } from "@saflib/sdk/testing";
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";

describe("listAccessRequests", () => {
  setupMockServer(secretsServiceFakeHandlers);

  it("should fetch and return access requests list", async () => {
    const [query, app] = withVueQuery(() =>
      useQuery(listAccessRequestsQuery({})),
    );

    await query.refetch();
    expect(query.data).toBeDefined();
    expect(Array.isArray(query.data?.value)).toBe(true);
    const data = query.data?.value;
    assert(data);
    expect(data).toHaveLength(3);
    expect(data[0]).toMatchObject({
      id: "request-1",
      secret_id: "secret-1",
      service_name: "test-service-1",
      status: "pending",
    });

    app.unmount();
  });

  it("should handle query parameters", async () => {
    const limit = ref(2);
    const status = ref<"pending" | "granted" | "denied">("pending");
    const serviceName = ref("test-service-1");

    const [query, app] = withVueQuery(() =>
      useQuery(
        listAccessRequestsQuery({ limit, status, service_name: serviceName }),
      ),
    );

    await query.refetch();
    expect(query.data).toBeDefined();
    expect(Array.isArray(query.data?.value)).toBe(true);
    const data = query.data?.value;
    assert(data);
    expect(data).toHaveLength(1);
    expect(data[0].status).toBe("pending");
    expect(data[0].service_name).toBe("test-service-1");

    app.unmount();
  });
});
