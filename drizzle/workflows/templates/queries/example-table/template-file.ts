import { templateFileDbManager } from "../../instances.ts";
import { TemplateFileNotFoundError } from "../../errors.ts";
import type {
  CreateTemplateFileParams,
  TemplateFileEntity,
} from "../../types.ts";
import type { ReturnsError } from "@saflib/monorepo";

import { queryWrapper } from "@saflib/drizzle";
import type { DbKey } from "@saflib/drizzle";
import { templateFileTable } from "../../schemas/__target-file__.ts";

export type TemplateFileError = TemplateFileNotFoundError;

export const templateFile = queryWrapper(
  async (
    dbKey: DbKey,
    params: CreateTemplateFileParams,
  ): Promise<ReturnsError<TemplateFileEntity, TemplateFileError>> => {
    const db = templateFileDbManager.get(dbKey)!;
    // TODO: replace this logic with your actual logic
    // For reference, this is standard "create" logic
    const result = await db
      .insert(templateFileTable)
      .values({
        ...params,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return {
      result: {
        ...result[0],
      },
    };
  },
);
