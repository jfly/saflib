import { type DbKey, queryWrapper } from "@saflib/drizzle-sqlite3";
import type { SelectEmailAuth } from "../../types.ts";
import { emailAuth } from "../../schema.ts";
import type { ReturnsError } from "@saflib/monorepo";
import { authDbManager } from "../../instances.ts";
import { VerificationTokenNotFoundError } from "../../errors.ts";
import { eq } from "drizzle-orm";

export const getByVerificationToken = queryWrapper(
  async (
    dbKey: DbKey,
    token: string,
  ): Promise<ReturnsError<SelectEmailAuth, VerificationTokenNotFoundError>> => {
    const db = authDbManager.get(dbKey)!;
    const result = await db.query.emailAuth.findFirst({
      where: eq(emailAuth.verificationToken, token),
    });
    if (!result) {
      return { error: new VerificationTokenNotFoundError() };
    }
    return { result };
  },
);
