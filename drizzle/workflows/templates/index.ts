export type * from "./types.ts";
export * from "./errors.ts";

import { templateFileManager } from "./instances.ts";
// TODO: Import query modules as you create them
// import * as templateFiles from "./queries/template-files/index.ts";

export const templateFile = {
  ...templateFileManager.publicInterface(),
  // TODO: Add query modules as you create them
  // templateFiles,
};
