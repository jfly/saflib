#!/usr/bin/env node
// import { startExpressServer } from "@saflib/express";
// import { createApiApp } from "../stub-http.ts";
// import { mainDb } from "../stub-db.ts";
import {
  addLokiTransport,
  collectSystemMetrics,
  makeSubsystemReporters,
} from "@saflib/node";
import { setServiceName } from "@saflib/node";
import { validateEnv } from "@saflib/env";
import envSchema from "../env.schema.combined.json" with { type: "json" };

validateEnv(process.env, envSchema);
setServiceName("@template/template-file");
addLokiTransport();
collectSystemMetrics();

async function main() {
  const { log, logError } = makeSubsystemReporters("init", "main");
  try {
    log.info("Starting up API server...");
    log.info("Connecting to @template/template-file-db...");
    // const dbKey = mainDb.connect({ onDisk: true, doNotCreate: true });
    log.info("@template/template-file-db connection complete.");

    log.info("Starting Express...");
    // const expressApp = createApiApp({ mainDbKey: dbKey });
    // startExpressServer(expressApp, {
    //   port: parseInt(process.env["@TEMPLATE_SERVICE_HTTP_PORT"] || "3000", 10),
    // });
    log.info("Express startup complete.");
  } catch (error) {
    logError(error);
  }
}

main();
