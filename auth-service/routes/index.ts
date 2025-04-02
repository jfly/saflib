import express from "express";
import { resendVerificationHandler } from "./auth-resend-verification.ts";
import { loginHandler } from "./auth-login.ts";
import { logoutHandler } from "./auth-logout.ts";
import { registerHandler } from "./auth-register.ts";
import { verifyHandler } from "./auth-verify.ts";
import { forgotPasswordHandler } from "./auth-forgot-password.ts";
import { resetPasswordHandler } from "./auth-reset-password.ts";

const router = express.Router();

router.use("/auth/login", loginHandler);
router.use("/auth/register", registerHandler);
router.use("/auth/logout", logoutHandler);
router.use("/auth/verify", verifyHandler);
router.use("/auth/forgot-password", forgotPasswordHandler);
router.use("/auth/reset-password", resetPasswordHandler);
router.use("/auth/resend-verification", resendVerificationHandler);
export { router as authRouter };
