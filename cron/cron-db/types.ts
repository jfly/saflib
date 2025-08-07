import type { DbTransaction } from "@saflib/drizzle-sqlite3";
import * as schema from "./schema.ts";

import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

// General Types
export type CronDbType = BetterSQLite3Database<typeof schema>;
export type CronDbTransaction = DbTransaction<typeof schema>;

// --- Job Settings --- //
export type JobSetting = typeof schema.jobSettings.$inferSelect;
export type NewJobSetting = typeof schema.jobSettings.$inferInsert;

export type LastRunStatus = "success" | "fail" | "running" | "timed out";
