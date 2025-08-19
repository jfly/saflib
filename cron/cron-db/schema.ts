import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export interface JobSetting {
  id: number;
  jobName: string;
  enabled: boolean;
  lastRunAt: Date | null;
  lastRunStatus: "success" | "fail" | "running" | "timed out" | null;
  createdAt: Date;
  updatedAt: Date;
}

export const jobSettings = sqliteTable("job_settings", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  jobName: text("job_name").notNull().unique(),
  enabled: integer("enabled", { mode: "boolean" }).notNull(), // Store boolean as integer 0/1
  lastRunAt: integer("last_run_at", { mode: "timestamp" }), // Nullable timestamp
  lastRunStatus: text("last_run_status", {
    enum: ["success", "fail", "running", "timed out"],
  }), // Nullable status enum
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// type Expect<T extends true> = T;
// type Equal<X, Y> =
//   (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
//     ? true
//     : false;

// export type JobSettingTest = Expect<
//   Equal<JobSetting, typeof jobSettings.$inferSelect>
// >;
