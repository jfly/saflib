import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import { createApp } from "../app.ts";
import passport from "passport";
import { getCsrfToken, testRateLimiting } from "./test-helpers.ts";

// Mock the email package
vi.mock("@saflib/email");

describe("Register Route", () => {
  let app: express.Express;

  beforeEach(() => {
    (passport as any)._serializers = [];
    (passport as any)._deserializers = [];
    app = createApp();
    vi.clearAllMocks();
  });

  it("should register a new user successfully and log them in", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
    };

    const agent = request.agent(app);
    const response = await agent.post("/auth/register").send(userData);
    const csrfToken = getCsrfToken(response);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: userData.email,
      scopes: [],
    });

    const verifyResponse = await agent
      .get("/auth/verify")
      .set("x-csrf-token", csrfToken);
    expect(verifyResponse.status).toBe(200);
    expect(verifyResponse.body).toEqual({
      id: expect.any(Number),
      email: userData.email,
      scopes: ["none"],
    });
  });

  it("should return 409 for duplicate email", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
    };

    await request(app).post("/auth/register").send(userData);

    const response = await request(app).post("/auth/register").send(userData);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: "Email already exists",
    });
  });

  it("should return 429 for too many requests", async () => {
    await testRateLimiting(() =>
      request(app).post("/auth/register").send({
        email: "test@example.com",
        password: "password123",
      }),
    );
  });
});
