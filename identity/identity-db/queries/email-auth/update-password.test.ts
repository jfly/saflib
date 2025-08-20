import { identityDbManager } from "../../instances.ts";
import type { DbKey } from "@saflib/drizzle-sqlite3";
import { identityDb } from "../../index.ts";
import { EmailAuthNotFoundError } from "../../errors.ts";
import { describe, it, expect, beforeEach, assert } from "vitest";

describe("updatePassword", () => {
  let dbKey: DbKey;

  beforeEach(() => {
    dbKey = identityDbManager.connect();
  });

  it("should update password", async () => {
    const { result: user } = await identityDb.users.create(dbKey, {
      email: "test@example.com",
    });
    assert(user);

    const passwordHash = Buffer.from([1, 2, 3]);
    await identityDb.emailAuth.create(dbKey, {
      userId: user.id,
      email: user.email,
      passwordHash,
    });

    const newPasswordHash = Buffer.from([4, 5, 6]);
    const { result: updated } = await identityDb.emailAuth.updatePassword(
      dbKey,
      user.id,
      newPasswordHash,
    );
    expect(updated).toMatchObject({
      passwordHash: newPasswordHash,
    });
  });

  it("should throw EmailAuthNotFoundError when user not found", async () => {
    const { error } = await identityDb.emailAuth.updatePassword(
      dbKey,
      999,
      Buffer.from([4, 5, 6]),
    );
    expect(error).toBeInstanceOf(EmailAuthNotFoundError);
  });
});
