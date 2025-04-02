import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import { createApp } from "../app.ts";
import passport from "passport";

// Mock argon2
vi.mock("argon2", () => ({
  hash: vi.fn().mockResolvedValue("hashed-password"),
  verify: vi.fn().mockResolvedValue(true),
}));

// Mock crypto
vi.mock("crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("crypto")>();
  return {
    ...crypto,
    randomBytes: vi.fn().mockReturnValue("test-token"),
  };
});

describe("Verify Email Route", () => {
  let app: express.Express;

  beforeEach(() => {
    (passport as any)._serializers = [];
    (passport as any)._deserializers = [];
    app = createApp();
    vi.clearAllMocks();
  });

  it("should verify email with valid token", async () => {
    // First create a user
    const userData = {
      email: "test@example.com",
      password: "password123",
    };
    const agent = request.agent(app);
    const response1 = await agent.post("/auth/register").send(userData);
    expect(response1.status).toBe(200);
    const response3 = await agent.post("/auth/login").send(userData);
    expect(response3.status).toBe(200);

    // Request verification email to get a token
    const response2 = await agent.post("/auth/resend-verification");
    expect(response2.status).toBe(200);

    // Get the token from the logs (in a real app, this would be sent via email)
    const token = "test-token"; // This would be the actual token from the email

    // Verify the email
    const response = await request(app).get(
      `/auth/verify-email?token=${token}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: userData.email,
      scopes: [],
    });
  });

  it("should return 400 for missing token", async () => {
    const response = await request(app).get("/auth/verify-email");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Verification token is required",
    });
  });

  it("should return 400 for invalid token", async () => {
    const response = await request(app).get("/auth/verify-email?token=invalid");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid or expired verification token",
    });
  });
});
