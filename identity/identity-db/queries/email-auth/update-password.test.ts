import { identityDb, usersDb, emailAuthDb } from "@saflib/identity-db";
import type { DbKey } from "@saflib/drizzle";
import { EmailAuthNotFoundError } from "../../errors.ts";
import { describe, it, expect, beforeEach, assert } from "vitest";

describe("updatePassword", () => {
  let dbKey: DbKey;

  beforeEach(() => {
    dbKey = identityDb.connect();
  });

  it("should update password", async () => {
    const { result: user } = await usersDb.create(dbKey, {
      email: "test@example.com",
    });
    assert(user);

    const passwordHash = Buffer.from([1, 2, 3]);
    await emailAuthDb.create(dbKey, {
      userId: user.id,
      email: user.email,
      passwordHash,
    });

    const newPasswordHash = Buffer.from([4, 5, 6]);
    const { result: updated } = await emailAuthDb.updatePassword(
      dbKey,
      user.id,
      newPasswordHash,
    );
    expect(updated).toMatchObject({
      passwordHash: newPasswordHash,
    });
  });

  it("should throw EmailAuthNotFoundError when user not found", async () => {
    const { error } = await emailAuthDb.updatePassword(
      dbKey,
      "999",
      Buffer.from([4, 5, 6]),
    );
    expect(error).toBeInstanceOf(EmailAuthNotFoundError);
  });
});
