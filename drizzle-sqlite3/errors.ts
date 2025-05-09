// To dissuade services from catching unhandled errors and papering over them programmatically, we log the error details and throw an error with a generic message. If a service catches this error, it should be solved (and/or possibly thrown as a new Error type) in the database library, not the service layer.

import { safStorage } from "@saflib/node";

export class UnhandledDatabaseError extends Error {
  constructor() {
    super("A database library did not catch and handle an error. Check logs.");
    this.name = "UnhandledDatabaseError";
  }
}

export class HandledDatabaseError extends Error {}

export function queryWrapper<T, A extends any[]>(
  queryFunc: (...args: A) => Promise<T>,
): (...args: A) => Promise<T> {
  return async (...args: A) => {
    try {
      return await queryFunc(...args);
    } catch (error) {
      if (error instanceof HandledDatabaseError) {
        throw error;
      }
      const ctx = safStorage.getStore();
      if (ctx) {
        ctx.log.error(error);
        if (error instanceof Error) {
          ctx.log.error(error.stack);
        }
      } else {
        console.error(error);
        if (error instanceof Error) {
          console.error(error.stack);
        }
      }
      throw new UnhandledDatabaseError();
    }
  };
}
