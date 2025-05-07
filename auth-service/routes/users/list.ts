import type { Request, Response } from "express";
import type { AuthResponse } from "@saflib/auth-spec";
import { createHandler } from "@saflib/express";
import { AuthDB } from "@saflib/auth-db";
// Define types using Drizzle's inferSelect
export const listUsersHandler = createHandler(
  async (req: Request, res: Response) => {
    const db: AuthDB = req.app.locals.db;
    // Fetch all users
    const users = await db.users.getAll();

    // Fetch corresponding email auth entries
    const userIds = users.map((u) => u.id);
    const emailAuths = await db.users.getEmailAuthByUserIds(userIds);

    // Create a map for quick email lookup
    const emailMap = new Map<number, string>();
    emailAuths.forEach((auth) => {
      emailMap.set(auth.userId, auth.email);
    });

    // Format the response according to the spec
    // Note: Spec requires email to be string, but emailAuth might be missing for a user?
    // Using a fallback string for now. Consider stricter error handling if needed.
    const responseBody = users
      .map((user) => ({
        id: user.id,
        createdAt: user.createdAt.toISOString(), // Convert to ISO string
        lastLoginAt: user.lastLoginAt?.toISOString() ?? null, // Convert to ISO string if not null
        email:
          emailMap.get(user.id) ?? `Error: Email not found for user ${user.id}`,
        verifiedAt:
          emailAuths
            .find((auth) => auth.userId === user.id)
            ?.verifiedAt?.toISOString() ?? null,
      }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Sort by ISO string

    res.json(responseBody satisfies AuthResponse["listUsers"]["200"]);
  },
);
