import * as argon2 from "argon2";
import { createHandler } from "@saflib/express";
import { createUserResponse } from "./_helpers.ts";
import type {
  IdentityResponseBody,
  IdentityRequestBody,
} from "@saflib/identity-spec";
import { randomBytes } from "crypto";
import { usersDb, emailAuthDb, EmailConflictError } from "@saflib/identity-db";
import { authServiceStorage } from "@saflib/identity-common";
import { linkToHref } from "@saflib/links";
import { authLinks } from "@saflib/auth-links";
import { getSafReporters } from "@saflib/node";

export const registerHandler = createHandler(async (req, res) => {
  const { dbKey } = authServiceStorage.getStore()!;
  const registerRequest: IdentityRequestBody["registerUser"] = req.body;
  const { email, password, name, givenName, familyName } = registerRequest;
  const { logError } = getSafReporters();

  const passwordHash = await argon2.hash(password);

  const { result: user, error } = await usersDb.create(dbKey, {
    email,
    name,
    givenName,
    familyName,
  });
  if (error) {
    switch (true) {
      case error instanceof EmailConflictError:
        res.status(409).json({
          message: "Email already exists",
        });
        return;
      default:
        throw error satisfies never;
    }
  }

  await emailAuthDb.create(dbKey, {
    userId: user.id,
    email,
    passwordHash,
    verifiedAt: null,
    verificationToken: null,
    verificationTokenExpiresAt: null,
    forgotPasswordToken: null,
    forgotPasswordTokenExpiresAt: null,
  });

  const verificationToken = randomBytes(16).toString("hex");
  const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  await emailAuthDb.updateVerificationToken(
    dbKey,
    user.id,
    verificationToken,
    verificationTokenExpiresAt,
  );

  const promises = [];
  const { callbacks } = authServiceStorage.getStore()!;
  if (callbacks.onUserCreated) {
    promises.push(callbacks.onUserCreated({ user }));
  }

  const verificationUrl = linkToHref(authLinks.verifyEmail, {
    params: { token: verificationToken },
  });
  if (callbacks.onVerificationTokenCreated) {
    promises.push(
      callbacks.onVerificationTokenCreated({
        user,
        verificationUrl,
        isResend: false,
      }),
    );
  }

  try {
    await Promise.all(promises);
  } catch (err) {
    // Don't let this error bubble up to the user
    logError(err);
  }

  req.logIn(user, (err) => {
    if (err) {
      throw err;
    }

    createUserResponse(dbKey, user).then((response) => {
      const successResponse: IdentityResponseBody["registerUser"][200] =
        response;
      res.status(200).json(successResponse);
    });
  });
});
