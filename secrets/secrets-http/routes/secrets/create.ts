import { createHandler } from "@saflib/express";
import type {
  SecretsServiceRequestBody,
  SecretsServiceResponseBody,
} from "@saflib/secrets-spec";
import createError from "http-errors";
import { secretsServiceStorage } from "@saflib/secrets-service-common";
import { secrets, SecretAlreadyExistsError } from "@saflib/secrets-db";
import { mapSecretToResponse } from "../_helpers.js";
import {
  upsertSecretEncryptionKey,
  encryptSecret,
} from "../../lib/encryption.js";
import { getSafContextWithAuth } from "@saflib/node";

export const createSecretHandler = createHandler(async (req, res) => {
  const ctx = secretsServiceStorage.getStore()!;
  const data: SecretsServiceRequestBody["createSecret"] = req.body;

  const { auth } = getSafContextWithAuth();

  // Get the encryption key
  const encryptionKey = upsertSecretEncryptionKey();

  // Encrypt the secret value
  const encryptedValue = encryptSecret(encryptionKey, data.value);

  // Call the database to create the secret
  const { result, error } = await secrets.create(ctx.secretsDbKey, {
    name: data.name,
    description: data.description || null,
    valueEncrypted: Buffer.from(encryptedValue, "base64"),
    createdBy: auth.userEmail,
    isActive: true,
  });

  // Handle expected errors
  if (error) {
    switch (true) {
      case error instanceof SecretAlreadyExistsError:
        throw createError(
          409,
          `Secret with name '${data.name}' already exists`,
        );
      default:
        throw error satisfies never;
    }
  }

  // Map result to API response
  const response: SecretsServiceResponseBody["createSecret"][201] =
    mapSecretToResponse(result);

  res.status(201).json(response);
});
