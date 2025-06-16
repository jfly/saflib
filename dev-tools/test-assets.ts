#!/usr/bin/env node --experimental-strip-types

import { Command } from "commander";
import { gatherTestAssets } from "./src/test-assets.ts";
import { genCoverage } from "./src/gen-coverage.ts";

const program = new Command()
  .name("saf-test-assets")
  .description("Manage test assets from the e2e and unit tests.");

program
  .command("gen-coverage")
  .description("Generate coverage for the tests.")
  .action(async () => {
    await genCoverage();
  });

// program
//   .command("gen-screenshots")
//   .description("Generate screenshots for the tests.")
//   .action(async () => {
//     await runScreenshots();
//   });

program
  .command("gather")
  .description("Gather test assets from the e2e and unit tests.")
  .argument("<target-dir>", "The directory to gather the test assets into.")
  .action(async (targetDir) => {
    await gatherTestAssets(targetDir);
  });

program.parse(process.argv);
