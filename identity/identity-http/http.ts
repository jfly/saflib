import { identityDb } from "@saflib/identity-db";
import { createErrorMiddleware, createGlobalMiddleware } from "@saflib/express";
import express from "express";
import { makeAuthRouter } from "./routes/auth/index.ts";
import { makeUsersRouter } from "./routes/users/index.ts";
import {
  authServiceStorage,
  type IdentityServerOptions,
} from "@saflib/identity-common";
import { createEmailsRouter } from "@saflib/email";
import { typedEnv } from "./env.ts";

// Define properties added to Express Request objects by middleware
declare global {
  namespace Express {
    interface Request {
      isValidCsrfToken: () => boolean;
    }
  }
}

/**
 * Starts the HTTP server for the identity service.
 */
export function createApp(options: IdentityServerOptions) {
  let dbKey = options.dbKey;
  if (!dbKey) {
    dbKey = identityDb.connect();
  }

  const app = express();
  app.use(createGlobalMiddleware());
  app.set("trust proxy", 1);

  app.set(
    "saf:admin emails",
    new Set(typedEnv.IDENTITY_SERVICE_ADMIN_EMAILS?.split(",") || []),
  );

  const context = { dbKey, callbacks: options.callbacks };
  app.use((_req, _res, next) => {
    authServiceStorage.run(context, () => {
      next();
    });
  });

  app.use(createEmailsRouter());
  app.use(makeAuthRouter());
  app.use(makeUsersRouter());
  app.use(createErrorMiddleware());

  return app;
}
