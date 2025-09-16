import { fromPromise } from "xstate";
import type { CopyStepContext } from "./types.ts";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  kebabCaseToSnakeCase,
  kebabCaseToPascalCase,
  kebabCaseToCamelCase,
} from "../../../strings.ts";

export const renameNextFile = fromPromise(
  async ({ input }: { input: CopyStepContext }) => {
    const { name, filesToCopy, runMode, lineReplace, copiedFiles } = input;

    const currentFileId = filesToCopy[0];
    const targetPath = copiedFiles[currentFileId];
    const targetFileName = path.basename(targetPath);

    if (runMode === "dry") {
      return { fileName: targetFileName };
    }

    const content = await readFile(targetPath, "utf-8");

    let updatedContent = content.split("\n");
    const snakeName = kebabCaseToSnakeCase(name);
    const pascalName = kebabCaseToPascalCase(name);
    const camelName = kebabCaseToCamelCase(name);

    for (var i = 0; i < updatedContent.length; i++) {
      if (updatedContent[i].includes("/* do not replace */")) {
        updatedContent[i] = updatedContent[i].replace(
          "/* do not replace */",
          "",
        );
        continue;
      }

      updatedContent[i] = updatedContent[i].replace(/template-file/g, name);
      updatedContent[i] = updatedContent[i].replace(
        /template_file/g,
        snakeName,
      );
      updatedContent[i] = updatedContent[i].replace(
        /TemplateFile/g,
        pascalName,
      );
      updatedContent[i] = updatedContent[i].replace(/templateFile/g, camelName);
      updatedContent[i] = updatedContent[i].replace(
        /TEMPLATE_FILE/g,
        snakeName.toUpperCase(),
      );
      if (lineReplace) {
        updatedContent[i] = lineReplace(updatedContent[i]);
      }
    }

    await writeFile(targetPath, updatedContent.join("\n"));

    return { fileName: targetFileName };
  },
);
