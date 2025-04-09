import type { Request, Response } from "express";
import { randomBytes } from "crypto";
import { createHandler } from "@saflib/node-express";
import { type AuthResponse } from "@saflib/auth-spec";
import { EmailClient } from "@saflib/email";
import { generatePasswordResetEmail } from "../email-templates/password-reset.js";

export const forgotPasswordHandler = createHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };

    try {
      const user = await req.db.users.getByEmail(email);
      const token = randomBytes(8).toString("hex");
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

      await req.db.emailAuth.updateForgotPasswordToken(
        user.id,
        token,
        expiresAt,
      );

      // Send password reset email
      const emailClient = new EmailClient();
      const resetUrl = `${process.env.PROTOCOL}://${process.env.DOMAIN}/auth/reset-password?token=${token}`;
      const { subject, html } = generatePasswordResetEmail(resetUrl);

      await emailClient.sendEmail({
        to: user.email,
        from: `noreply@${process.env.DOMAIN}`, // Use a noreply address
        subject,
        html,
      });
      req.log.info(`Password reset email successfully sent to ${user.email}`);
      const successResponse: AuthResponse["forgotPassword"][200] = {
        success: true,
        message: "If the email exists, a recovery email has been sent",
      };
      res.status(200).json(successResponse);
    } catch (err) {
      if (err instanceof req.db.users.UserNotFoundError) {
        // Return success even if user doesn't exist to prevent email enumeration
        const successResponse: AuthResponse["forgotPassword"][200] = {
          success: true,
          message: "If the email exists, a recovery email has been sent",
        };
        res.status(200).json(successResponse);
        return;
      }
      throw err;
    }
  },
);
