import * as argon2 from "argon2";
import { createHandler } from "@saflib/express";
import type { AuthRequest, AuthResponse } from "@saflib/auth-spec";
import { authDb, EmailAuthNotFoundError } from "@saflib/auth-db";
import { authServiceStorage } from "../../context.ts";

export const setPassword = createHandler(async (req, res) => {
  const { dbKey } = authServiceStorage.getStore()!;

  if (!req.user) {
    res.status(401).json({
      message: "User must be logged in",
    } satisfies AuthResponse["setPassword"][401]);
    return;
  }

  const data: AuthRequest["setPassword"] = req.body;
  const { currentPassword, newPassword } = data;

  // Get the user's current email auth record to verify current password
  const { result: emailAuth, error } = await authDb.emailAuth.getByEmail(
    dbKey,
    req.user.email,
  );
  if (error) {
    switch (true) {
      case error instanceof EmailAuthNotFoundError:
        res.status(401).json({
          message: "Authentication error",
        } satisfies AuthResponse["setPassword"][401]);
        return;
      default:
        throw error satisfies never;
    }
  }

  // Verify the current password
  const passwordHash = Buffer.from(
    emailAuth.passwordHash as Uint8Array,
  ).toString("utf-8");

  const isCurrentPasswordValid = await argon2.verify(
    passwordHash,
    currentPassword,
  );
  if (!isCurrentPasswordValid) {
    res.status(401).json({
      message: "Current password is incorrect",
    } satisfies AuthResponse["setPassword"][401]);
    return;
  }

  // Hash the new password and update it
  const newPasswordHash = await argon2.hash(newPassword);

  await authDb.emailAuth.updatePassword(
    dbKey,
    req.user.id,
    Buffer.from(newPasswordHash),
  );

  // Call onPasswordUpdated callback if defined
  const { callbacks } = req.app.get("authOptions") || {};
  if (callbacks && typeof callbacks.onPasswordUpdated === "function") {
    await callbacks.onPasswordUpdated(req.user);
  }

  const response: AuthResponse["setPassword"][200] = {
    success: true,
  };
  res.status(200).json(response);
});
