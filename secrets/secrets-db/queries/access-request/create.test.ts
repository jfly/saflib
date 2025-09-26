import { describe, it, expect, beforeEach, afterEach, assert } from "vitest";
import type { DbKey } from "@saflib/drizzle";
import { secretsDb } from "../../index.ts";
import { create } from "./create.ts";
import { AccessRequestAlreadyExistsError } from "../../errors.ts";

describe("create", () => {
  let dbKey: DbKey;

  beforeEach(() => {
    dbKey = secretsDb.connect();
  });

  afterEach(async () => {
    secretsDb.disconnect(dbKey);
  });

  it("should execute successfully", async () => {
    const { result } = await create(dbKey, {
      secretName: "test-secret-id",
      serviceName: "test-service",
    });
    expect(result).toBeDefined();
    assert(result);
    expect(result.secretName).toBe("test-secret-id");
    expect(result.serviceName).toBe("test-service");
    expect(result.accessCount).toBe(0);
    expect(result.id).toBeDefined();
    expect(result.requestedAt).toBeDefined();
  });

  it("should handle duplicate access request error", async () => {
    // Create first access request
    await create(dbKey, {
      secretName: "test-secret-id",
      serviceName: "test-service",
    });

    // Try to create second access request with same secretId and serviceName
    const { error } = await create(dbKey, {
      secretName: "test-secret-id",
      serviceName: "test-service",
    });

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(AccessRequestAlreadyExistsError);
  });
});
