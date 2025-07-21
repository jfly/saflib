import { createHandler } from "@saflib/express";
import { randomBytes } from "crypto";
import { type AuthResponse } from "@saflib/auth-spec";
import { authDb } from "@saflib/auth-db";
import { authServiceStorage } from "../../context.ts";
import { linkToHref } from "@saflib/links";
import { authLinks } from "@saflib/auth-links";

export const resendVerificationHandler = createHandler(async (req, res) => {
  const { dbKey } = authServiceStorage.getStore()!;
  if (!req.user) {
    res.status(401).json({
      message: "User must be logged in",
    } satisfies AuthResponse["resendVerification"][401]);
    return;
  }

  const verificationToken = randomBytes(32).toString("hex");
  const verificationTokenExpiresAt = new Date();
  verificationTokenExpiresAt.setMinutes(
    verificationTokenExpiresAt.getMinutes() + 15,
  );

  await authDb.emailAuth.updateVerificationToken(
    dbKey,
    req.user.id,
    verificationToken,
    verificationTokenExpiresAt,
  );

  const verificationUrl = linkToHref(authLinks.verifyEmail, {
    params: { token: verificationToken },
  });
  const { callbacks } = authServiceStorage.getStore()!;
  if (callbacks.onVerificationTokenCreated) {
    await callbacks.onVerificationTokenCreated(req.user, verificationUrl, true);
  }

  const response: AuthResponse["resendVerification"][200] = {
    success: true,
    message: "Verification email sent",
  };
  res.status(200).json(response);
});
