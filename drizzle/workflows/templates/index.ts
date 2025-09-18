export type * from "./types.ts";
export * from "./errors.ts";

import { templateFileDbManager } from "./instances.ts";
// TODO: Import query modules as you create them
// import * as templateFiles from "./queries/template-files/index.ts";

export const templateFileDb = templateFileDbManager.publicInterface();
