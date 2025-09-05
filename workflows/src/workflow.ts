import type { WorkflowArgument, ChecklistItem, WorkflowBlob } from "./types.ts";
import type { AnyStateMachine, AnyActor, AnyActorRef } from "xstate";
import { createActor, waitFor } from "xstate";
import { getSafReporters } from "@saflib/node";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { allSettled, continueWorkflow } from "./utils.ts";
import type {
  WorkflowContext,
  WorkflowInput,
  WorkflowOutput,
} from "./xstate.ts";
import type { ReturnsError } from "@saflib/monorepo";

// The following is TS magic to describe a class constructor that implements the Workflow class.
type AbstractClassConstructor<T extends AbstractWorkflowRunner> = new (...args: any[]) => T;

/**
 * A concrete subclass of XStateWorkflowRunner. Packages which export workflows should use this to type the array of workflow classes. This is the type which the CLI tool accepts to provide a list of workflows.
 */
export type ConcreteWorkflowRunner = AbstractClassConstructor<AbstractWorkflowRunner>;

/**
 * Abstract superclass for XStateWorkflow. Can probably be removed since SimpleWorkflows are gone.
 */
export abstract class AbstractWorkflowRunner {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly cliArguments: readonly WorkflowArgument[];
  abstract readonly sourceUrl: string;
  abstract init: (...args: any[]) => Promise<ReturnsError<any>>;
  abstract kickoff(): Promise<boolean>;
  abstract printStatus(): Promise<void>;
  abstract getCurrentStateName(): string;
  abstract goToNextStep(): Promise<void>;
  abstract dehydrate(): WorkflowBlob;
  abstract hydrate(blob: WorkflowBlob): void;
  abstract done(): boolean;
  abstract getChecklist(): ChecklistItem[];
  abstract getError(): Error | undefined;
}

interface XStateWorkflowOptions {
  dryRun?: boolean;
}

/**
 * A class used to load and run the workflow, managing XState events and I/O operations. This is an abstract super class and should be subclassed with the WorkflowDefinition and other properties set. Those subclasses are what the CLI tool uses to create and run workflows.
 *
 * To use, subclass it with:
 * * machine - the XState machine for the workflow.
 * * sourceUrl - import.meta.url
 * * description - to show up in the CLI tool
 * * cliArguments - to show up in the CLI tool
 */
export abstract class XStateWorkflowRunner extends AbstractWorkflowRunner {
  abstract readonly machine: AnyStateMachine;
  private input: any;
  private actor: AnyActor | undefined;

  get name() {
    return this.machine.id;
  }

  init = async (
    options: XStateWorkflowOptions,
    ...args: string[]
  ): Promise<ReturnsError<any>> => {
    if (args.length !== this.cliArguments.length) {
      return {
        error: new Error(
          `Expected ${this.cliArguments.length} arguments, got ${args.length}`,
        ),
      };
    }
    const input = {} as any;
    for (let i = 0; i < this.cliArguments.length; i++) {
      input[this.cliArguments[i].name] = args[i];
    }
    input.dryRun = options.dryRun;
    this.input = input;

    return { result: undefined };
  };

  kickoff = async (): Promise<boolean> => {
    const actor = createActor(this.machine, { input: this.input });
    actor.start();
    const snapshot = actor.getSnapshot();
    if (snapshot.status === "error") {
      console.log("Actor started with error", snapshot.error);
      return false;
    }
    await waitFor(actor, allSettled);
    const { log } = getSafReporters();
    log.info("");
    log.info("To continue, run 'npm exec saf-workflow next'");
    this.actor = actor;
    return actor.getSnapshot().status !== "error";
  };

  printStatus = async (): Promise<void> => {
    if (!this.actor) {
      throw new Error("Workflow not started");
    }
    this.actor.send({ type: "prompt" });
    await waitFor(this.actor, allSettled);
  };

  goToNextStep = async (): Promise<void> => {
    const { log } = getSafReporters();
    if (!this.actor) {
      throw new Error("Workflow not started");
    }
    if (this.actor.getSnapshot().status === "error") {
      log.error("This workflow has errored. And could not continue.");
      return;
    }

    continueWorkflow(this.actor);
    await waitFor(this.actor, allSettled);

    if (this.actor.getSnapshot().status === "done") {
      log.info("\nThis workflow has been completed.\n");
      return;
    }
  };

  dehydrate = (): WorkflowBlob => {
    return {
      workflowName: this.name,
      snapshotState: this.actor?.getPersistedSnapshot(),
    };
  };

  hydrate = (blob: WorkflowBlob): void => {
    this.actor = createActor(this.machine, {
      snapshot: blob.snapshotState,
    });
    this.actor.start();
  };

  done = (): boolean => {
    if (!this.actor) {
      return false;
    }
    return this.actor.getSnapshot().status === "done";
  };

  getChecklist = (): ChecklistItem[] => {
    if (!this.actor) {
      return [];
    }
    return this.actor.getSnapshot().output.checklist;
  };

  getCurrentStateName = (): string => {
    if (!this.actor) {
      return "not started";
    }
    return this.actor.getSnapshot().value;
  };

  getError = (): Error | undefined => {
    if (!this.actor) {
      return undefined;
    }
    return this.actor.getSnapshot().error;
  };
}

/**
 * Utility function to get the package name from the root URL.
 */
export function getPackageName(rootUrl: string) {
  if (!rootUrl.startsWith("file://")) {
    throw new Error("Root URL should be import.meta.url");
  }
  const rootPath = path.dirname(rootUrl.replace("file://", ""));
  let currentDir = rootPath;
  while (true) {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
      return packageJson.name;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error("package.json not found");
    }
    currentDir = parentDir;
  }
}

/**
 * Helper function to create initial `WorkflowContext` from `WorkflowInput`.
 */
export function contextFromInput(input: WorkflowInput): WorkflowContext {
  return {
    checklist: [],
    loggedLast: false,
    systemPrompt: input.systemPrompt,
    dryRun: input.dryRun,
    rootRef: input.rootRef as AnyActorRef,
    templateFiles: input.templateFiles,
    copiedFiles: input.copiedFiles,
    docFiles: input.docFiles,
  };
}

/**
 * Helper function to create `WorkflowOutput` from `WorkflowContext`.
 */
export function outputFromContext({
  context,
}: {
  context: WorkflowContext;
}): WorkflowOutput {
  return {
    checklist: context.checklist,
  };
}
