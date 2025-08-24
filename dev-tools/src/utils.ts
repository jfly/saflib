import { existsSync, readFileSync } from "fs";
import path, { join } from "node:path";
import { fileURLToPath } from "node:url";

export const getCurrentPackage = () => {
  const currentPackage = readFileSync(
    join(process.cwd(), "package.json"),
    "utf8",
  );
  return JSON.parse(currentPackage).name;
};

export const directoryFromMetaUrl = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = path.dirname(__filename);
  return __dirname;
};

export const getSaflibAbsoluteDir = () => {
  let currentDir = process.cwd();
  while (currentDir !== "/") {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (!existsSync(packageJsonPath)) {
      currentDir = path.dirname(currentDir);
      continue;
    }
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    if (packageJson.name === "@saflib/saflib") {
      break;
    }
    currentDir = path.dirname(currentDir);
  }
  return currentDir;
};

export const getTopWorkflowDir = () => {
  let currentDir = process.cwd();
  let lastWorkspaceDir = "";
  while (currentDir !== "/") {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (!existsSync(packageJsonPath)) {
      currentDir = path.dirname(currentDir);
      continue;
    }
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    if (packageJson.workspaces) {
      lastWorkspaceDir = currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  return lastWorkspaceDir;
};

export const getGitHubUrl = (absolutePath: string) => {
  const saflibDir = getSaflibAbsoluteDir();
  const relativePath = absolutePath.replace(saflibDir, "");
  return "https://github.com/sderickson/saflib/blob/main" + relativePath;
};
