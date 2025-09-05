import type { WorkflowContext } from "../../../src/xstate.ts";

/**
 * Input for the CopyStepMachine.
 */
export interface CopyStepInput {
  /**
   * kebab-case name of the thing being created from the template. Will be used to query replace instances of "template-file" and other variants like templateFile and template_file.
   */
  name: string;

  /**
   * Absolute path to the directory where the updated copies of the template files will go.
   */
  targetDir: string;
}

export interface CopyTemplateMachineContext extends WorkflowContext {
  filesToCopy: string[];
  name: string;
  targetDir: string;
  copiedFiles: Record<string, string>;
}
