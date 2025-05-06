import { describe, it, expect, beforeEach } from "vitest";
import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { eq } from "drizzle-orm";
import { DbManager } from "./instances.ts";
import type { DbKey, DbOptions } from "./types.ts";
import type { Config } from "drizzle-kit";
import config from "./drizzle.config.ts";
import * as schema from "./test-schema.ts";
import assert from "node:assert";
// Helper to get a temporary DB path for testing file-based storage
const getTempDbPath = (name: string) =>
  resolve(__dirname, `test-data/temp-test-${name}.db`);

// Clean up temp DB files before each test
beforeEach(() => {
  try {
    rmSync(getTempDbPath("init"), { force: true });
    rmSync(getTempDbPath("get1"), { force: true });
    rmSync(getTempDbPath("get2"), { force: true });
    rmSync(getTempDbPath("delete"), { force: true });
  } catch (e) {
    // Ignore errors if files don't exist
  }
});

describe("Instance Manager", () => {
  const manager = new DbManager(schema, config);

  it("should initialize an in-memory database and return a unique DbKey", () => {
    const option: DbOptions = { inMemory: true };
    const key1Result = manager.connect(option);
    const key2Result = manager.connect(option);

    expect(key1Result).toBeTypeOf("symbol");
    expect(key2Result).toBeTypeOf("symbol");
    expect(key1Result).not.toEqual(key2Result);

    // Clean up
    if (typeof key1Result === "symbol") manager.disconnect(key1Result);
    if (typeof key2Result === "symbol") manager.disconnect(key2Result);
  });

  it("should initialize a file-based database and return a unique DbKey", () => {
    const dbPath = getTempDbPath("init");
    const config: DbOptions = { dbPath };
    const keyResult = manager.connect(config);

    expect(keyResult).toBeTypeOf("symbol");

    // Clean up
    if (typeof keyResult === "symbol") manager.disconnect(keyResult);
    rmSync(dbPath, { force: true }); // Ensure file is deleted
  });

  it("should throw an Error if initialization fails", () => {
    // Simulate failure by providing an invalid migrations path
    const brokenConfig: Config = {
      ...config,
      out: "./non-existent-migrations",
    };
    const faultyManager = new DbManager(schema, brokenConfig);
    expect(() => faultyManager.connect({})).toThrow(Error);
  });

  it("should get the correct DrizzleInstance using a DbKey", () => {
    const config1: DbOptions = { dbPath: getTempDbPath("get1") };
    const config2: DbOptions = { dbPath: getTempDbPath("get2") };
    const key1Result = manager.connect(config1);
    const key2Result = manager.connect(config2);

    expect(key1Result).toBeTypeOf("symbol");
    expect(key2Result).toBeTypeOf("symbol");
    const key1 = key1Result as DbKey;
    const key2 = key2Result as DbKey;

    const instance1 = manager.get(key1);
    assert(instance1);
    const instance2 = manager.get(key2);
    assert(instance2);

    expect(instance1).toBeDefined();
    expect(instance2).toBeDefined();
    expect(instance1).not.toBe(instance2);

    // Quick check: Insert data into one, verify it doesn't exist in the other
    instance1
      .insert(schema.testTable)
      .values({
        name: "test1",
      })
      .run();
    instance2
      .insert(schema.testTable)
      .values({
        name: "test2",
      })
      .run();

    const result1 = instance1!
      .select()
      .from(schema.testTable)
      .where(eq(schema.testTable.name, "test1"))
      .get();
    const result2 = instance2!
      .select()
      .from(schema.testTable)
      .where(eq(schema.testTable.name, "test2"))
      .get();
    const crossResult1 = instance1!
      .select()
      .from(schema.testTable)
      .where(eq(schema.testTable.name, "test2"))
      .get();
    const crossResult2 = instance2!
      .select()
      .from(schema.testTable)
      .where(eq(schema.testTable.name, "test1"))
      .get();

    expect(result1?.name).toBe("test1");
    expect(result2?.name).toBe("test2");
    expect(crossResult1).toBeUndefined();
    expect(crossResult2).toBeUndefined();

    // Clean up
    manager.disconnect(key1);
    manager.disconnect(key2);
  });

  it("should return undefined when getting an instance with an invalid or deleted key", () => {
    const invalidKey: DbKey = Symbol("invalid");
    expect(manager.get(invalidKey)).toBeUndefined();

    const config: DbOptions = { dbPath: getTempDbPath("delete") };
    const keyResult = manager.connect(config);
    expect(keyResult).toBeTypeOf("symbol");
    const key = keyResult as DbKey;

    const deleted = manager.disconnect(key);
    expect(deleted).toBe(true);
    expect(manager.get(key)).toBeUndefined();
  });

  it("should return false when trying to delete an instance with an invalid key", () => {
    const invalidKey: DbKey = Symbol("invalid");
    const deleted = manager.disconnect(invalidKey);
    expect(deleted).toBe(false);
  });
});
