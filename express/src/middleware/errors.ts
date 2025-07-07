import createError, { HttpError } from "http-errors";
import type { Request, Response, NextFunction, Handler } from "express";
import { getSafReporters, safReportersStorage } from "@saflib/node";
/**
 * 404 Handler
 * Catches requests to undefined routes
 */
export const notFoundHandler: Handler = (_req, _res, next) => {
  next(createError(404));
};

/**
 * Error Handler
 * Central error handling middleware that logs errors and returns standardized error responses
 */
export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _: NextFunction,
): void => {
  // Log error
  const status = err.status || 500;

  // TODO: Remove this
  const { logError } = getSafReporters();
  logError(new Error("Test error"), {
    level: "debug",
    extra: {
      status,
    },
  });

  if (status >= 500) {
    if (process.env.NODE_ENV === "test") {
      console.error(err.stack);
    }
    const store = safReportersStorage.getStore();
    if (store) {
      store.logError(err);
    } else {
      console.log("Error", err);
    }
  }

  // Send error response
  res.status(status);
  res.json({
    message: err.message,
    status,
  });
};
