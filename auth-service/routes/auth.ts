import express from "express";
import type { Request, Response } from "express";
import passport from "passport";
import type { IVerifyOptions } from "passport-local";
import type { RegisterRequest, UserResponse } from "@saflib/auth-spec";
import type { AuthDB } from "@saflib/auth-db";
import * as argon2 from "argon2";
import { createHandler } from "@saflib/node-express";
import type { User } from "../types.ts";
import crypto from "crypto";

export const authRouter = express.Router();

// Helper function to get user scopes
async function getUserScopes(db: AuthDB, userId: number): Promise<string[]> {
  const permissions = await db.permissions.getByUserId(userId);
  return permissions.map((p) => p.permission);
}

// Helper function to create user response
async function createUserResponse(
  db: AuthDB,
  user: User,
): Promise<UserResponse> {
  const scopes = await getUserScopes(db, user.id);
  return {
    id: user.id,
    email: user.email,
    scopes,
  };
}

authRouter.post(
  "/register",
  createHandler(async (req, res, next) => {
    try {
      const registerRequest: RegisterRequest = req.body;
      const { email, password } = registerRequest;

      // Hash the password with argon2
      const passwordHash = await argon2.hash(password);

      // Create the user
      const user = await req.db.users.create({
        email,
        createdAt: new Date(),
      });

      // Auto-assign admin permission for test environment users with admin.*@email.com pattern
      if (
        process.env.ALLOW_ADMIN_SIGNUPS === "true" &&
        email.match(/^admin\..*@email\.com$/)
      ) {
        await req.db.permissions.add(user.id, "admin", user.id);
      }

      // Create email authentication
      await req.db.emailAuth.create({
        userId: user.id,
        email: user.email,
        passwordHash: Buffer.from(passwordHash),
      });

      // Log the user in
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        createUserResponse(req.db, user).then((response) => {
          res.status(200).json(response);
        });
      });
    } catch (err) {
      if (err instanceof req.db.users.EmailConflictError) {
        res.status(409).json({ message: "Email already exists" });
        return;
      }
      next(err);
    }
  }),
);

authRouter.post(
  "/login",
  createHandler(async function (req, res, next) {
    passport.authenticate(
      "local",
      (
        err: Error | null,
        user: Express.User | false,
        _info: IVerifyOptions | undefined,
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          createUserResponse(req.db, user).then((response) => {
            res.json(response);
          });
        });
      },
    )(req, res, next);
  }),
);

authRouter.post(
  "/logout",
  createHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).end();
    });
  }),
);

authRouter.get(
  "/verify",
  createHandler(async (req: Request, res: Response) => {
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
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }

    const user = req.user as Express.User;
    // Add user info to response headers for potential use by downstream services
    res.setHeader("X-User-ID", user.id.toString());
    res.setHeader("X-User-Email", user.email);

    // Get user scopes and add to headers
    const scopes = await getUserScopes(req.db, user.id);
    if (scopes.length === 0) {
      scopes.push("none");
    }
    res.setHeader("X-User-Scopes", scopes.join(","));

    // Return user info including scopes in response body
    res.status(200).json({
      id: user.id,
      email: user.email,
      scopes,
    });
  }),
);

authRouter.post(
  "/forgot-password",
  createHandler(async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };

    try {
      // Find user by email
      const user = await req.db.users.getByEmail(email);

      // Generate a secure random token
      const token = crypto.randomBytes(8).toString("hex");
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

      // Update the user's forgot password token
      const result = await req.db.emailAuth.updateForgotPasswordToken(
        user.id,
        token,
        expiresAt,
      );
      req.log.info(
        `Updated forgot password token for ${email}: ${JSON.stringify(result)}`,
      );

      // TODO: Send email with reset link
      // This will be implemented in a separate task
      req.log.info(`Password reset token for ${email}: ${token}`);

      res.status(200).json({
        success: true,
        message: "If the email exists, a recovery email has been sent",
      });
    } catch (err) {
      if (err instanceof req.db.users.UserNotFoundError) {
        // Return success even if user doesn't exist to prevent email enumeration
        res.status(200).json({
          success: true,
          message: "If the email exists, a recovery email has been sent",
        });
        return;
      }
      throw err; // Re-throw other errors to be handled by error middleware
    }
  }),
);

authRouter.post(
  "/reset-password",
  createHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body as {
      token: string;
      newPassword: string;
    };

    try {
      // Find user by forgot password token
      req.log.info(`Finding email auth for token: ${token}`);
      const emailAuth = await req.db.emailAuth.getByForgotPasswordToken(token);
      req.log.info(`Found email auth for token: ${token}`);
      // Check if token is expired
      if (
        !emailAuth.forgotPasswordTokenExpiresAt ||
        emailAuth.forgotPasswordTokenExpiresAt < new Date()
      ) {
        req.log.info(`Token expired: ${token}`);
        res.status(404).json({ message: "Invalid or expired token" });
        return;
      }

      // Hash the new password
      const passwordHash = await argon2.hash(newPassword);

      // Update the password and clear the forgot password token
      await req.db.emailAuth.updatePassword(
        emailAuth.userId,
        Buffer.from(passwordHash),
      );
      await req.db.emailAuth.clearForgotPasswordToken(emailAuth.userId);

      res.status(200).json({ success: true });
    } catch (err) {
      if (err instanceof req.db.emailAuth.TokenNotFoundError) {
        console.error(err);
        res.status(404).json({ message: "Invalid or expired token" });
        return;
      }
      throw err; // Re-throw other errors to be handled by error middleware
    }
  }),
);
