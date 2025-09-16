import { AsyncLocalStorage } from "async_hooks";
import type { DbKey } from "@saflib/drizzle";
// import { templateFileDb } from "@your-org/template-file-db";

export interface TemplateFileServiceContext {
  templateFileDbKey: DbKey;
}

export const templateFileServiceStorage =
  new AsyncLocalStorage<TemplateFileServiceContext>();

export interface TemplateFileServiceContextOptions {
  templateFileDbKey?: DbKey;
}

// TODO: Uncomment this and make sure it's correct
// export const makeContext = (
//   options: MakeContextOptions = {},
// ): ApiServiceContext => {
//   const dbKey = options.templateFileDbKey ?? templateFileDb.connect();
//   return {
//     templateFileDbKey: dbKey,
//   };
// };
