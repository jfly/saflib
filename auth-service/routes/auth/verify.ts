import { createHandler } from "@saflib/express";
import { type AuthResponse } from "@saflib/auth-spec";
import { authDb, EmailAuthNotFoundError } from "@saflib/auth-db";
import { authServiceStorage } from "../../context.ts";

export const verifyHandler = createHandler(async (req, res) => {
  const { dbKey } = authServiceStorage.getStore()!;
  // TODO: Figure out how to handle OPTIONS in caddy, or at the very least,
  // don't forward_auth OPTIONS requests.

  if (req.headers["x-forwarded-uri"] === "/health") {
    res.status(200).end();
    return;
  }

  if (req.headers["x-forwarded-method"] === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (!req.isAuthenticated()) {
    const errorResponse: AuthResponse["verifyAuth"][401] = {
      message: "Unauthorized!",
    };
    res.status(401).json(errorResponse);
    return;
  }

  if (!req.isValidCsrfToken() && req.headers["x-csrf-skip"] !== "true") {
    const errorResponse: AuthResponse["verifyAuth"][403] = {
      message: "CSRF token mismatch!",
    };
    res.status(403).json(errorResponse);
    return;
  }

  // Add headers for downstream services
  const user = req.user as Express.User;
  const scopes: string[] = [];
  res.setHeader("X-User-ID", user.id.toString());
  res.setHeader("X-User-Email", user.email);
  res.setHeader("X-User-Email-Verified", user.emailVerified ? "true" : "false");

  if (req.app.get("saf:admin emails").has(user.email)) {
    const { result: emailAuth, error } = await authDb.emailAuth.getByEmail(
      dbKey,
      user.email,
    );
    if (error) {
      switch (true) {
        case error instanceof EmailAuthNotFoundError:
          throw error;
        default:
          throw error satisfies never;
      }
    }
    if (emailAuth.verifiedAt) {
      scopes.push("*");
      // TODO: set up a way to map roles -> scopes.
    }
  }

  if (req.headers["x-require-admin"] === "true") {
    if (!scopes.includes("*")) {
      const errorResponse: AuthResponse["verifyAuth"][403] = {
        message: "Forbidden!",
      };
      res.status(403).json(errorResponse);
      return;
    }
  }

  if (scopes.length === 0) {
    scopes.push("none");
  }
  res.setHeader("X-User-Scopes", scopes.join(","));

  const successResponse: AuthResponse["verifyAuth"][200] = {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    scopes,
  };
  res.status(200).json(successResponse);
});
