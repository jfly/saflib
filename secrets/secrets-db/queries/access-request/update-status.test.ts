import { describe, it, expect, beforeEach, afterEach, assert } from "vitest";
import type { DbKey } from "@saflib/drizzle";
import { secretsDb } from "../../index.ts";
import { updateStatus } from "./update-status.ts";
import { create } from "./create.ts";
import { AccessRequestNotFoundError } from "../../errors.ts";

describe("updateStatus", () => {
  let dbKey: DbKey;

  beforeEach(() => {
    dbKey = secretsDb.connect();
  });

  afterEach(async () => {
    secretsDb.disconnect(dbKey);
  });

  it("should execute successfully", async () => {
    // First create an access request
    const { result: createdRequest } = await create(dbKey, {
      secretName: "test-secret-name",
      serviceName: "test-service",
    });

    assert(createdRequest);

    // Then update its status
    const { result } = await updateStatus(dbKey, {
      id: createdRequest.id,
      status: "granted",
      grantedBy: "admin-user",
    });

    expect(result).toBeDefined();
    assert(result);
    expect(result.id).toBe(createdRequest.id);
    expect(result.status).toBe("granted");
    expect(result.grantedBy).toBe("admin-user");
    expect(result.grantedAt).toBeDefined();
    expect(result.secretName).toBe("test-secret-name"); // unchanged
    expect(result.serviceName).toBe("test-service"); // unchanged
  });

  it("should return error for non-existent id", async () => {
    const { error } = await updateStatus(dbKey, {
      id: "non-existent-id",
      status: "granted",
      grantedBy: "admin-user",
    });

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(AccessRequestNotFoundError);
  });
});
