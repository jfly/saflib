import { queryWrapper } from "@saflib/drizzle-sqlite3";
import type { SelectEmailAuth } from "../../types.ts";
import { emailAuth } from "../../schema.ts";
import { inArray } from "drizzle-orm";
import { identityDbManager } from "../../instances.ts";
import type { DbKey } from "@saflib/drizzle-sqlite3";

export const getEmailAuthByUserIds = queryWrapper(
  async (dbKey: DbKey, ids: number[]): Promise<SelectEmailAuth[]> => {
    if (ids.length === 0) {
      return [];
    }
    const db = identityDbManager.get(dbKey)!;
    const result = await db
      .select()
      .from(emailAuth)
      .where(inArray(emailAuth.userId, ids))
      .execute();

    return result;
  },
);
