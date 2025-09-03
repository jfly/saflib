import path from "node:path";
import { fromPromise } from "xstate";
import type { WorkflowContext } from "../../../src/xstate.ts";
import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { copyFile } from "node:fs/promises";
import { transformName } from "./utils.ts";
import type { CopyTemplateMachineContext } from "./types.ts";

export const copyNextFile = fromPromise(
  async ({ input }: { input: CopyTemplateMachineContext }) => {
    const { sourceDir, targetDir, name, filesToCopy, dryRun } = input;

    if (filesToCopy.length === 0) {
      throw new Error("No files to copy");
    }

    const currentFile = filesToCopy[0];
    const sourcePath = path.join(sourceDir, currentFile);
    const targetFileName = transformName(currentFile, name);
    const targetPath = path.join(targetDir, targetFileName);

    if (dryRun) {
      return { skipped: false, fileName: targetFileName };
    }

    // Check if target file already exists
    try {
      await access(targetPath, constants.F_OK);
      return { skipped: true, fileName: targetFileName };
    } catch {
      // File doesn't exist, proceed with copy
    }

    // Ensure target directory exists
    await import("node:fs/promises").then((fs) =>
      fs.mkdir(path.dirname(targetPath), { recursive: true }),
    );

    await copyFile(sourcePath, targetPath);
    return { skipped: false, fileName: targetFileName };
  },
);
