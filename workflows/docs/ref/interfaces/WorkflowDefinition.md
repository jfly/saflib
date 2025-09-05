[**@saflib/workflows**](../index.md)

***

# Interface: WorkflowDefinition\<I, C\>

An interface that includes the inputs, files, steps, and everything else that makes up a workflow. Can be used to create an XState machine which can be used in other workflows, and an XStateWorkflowRunner which will execute just the workflow itself.

## Type Parameters

| Type Parameter |
| ------ |
| `I` *extends* readonly [`WorkflowArgument`](WorkflowArgument.md)[] |
| `C` |

## Properties

### context()

> **context**: (`arg`) => `C`

The context specific to this workflow, generated from the input and available to use in each step.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `arg` | \{ `input`: `CreateArgsType`\<`I`\>; \} |
| `arg.input` | `CreateArgsType`\<`I`\> |

#### Returns

`C`

***

### description

> **description**: `string`

Description of the workflow which will be shown in the CLI tool.

***

### docFiles

> **docFiles**: `Record`\<`string`, `string`\>

A map of ids to doc file absolute paths which will be referenced as part of the workflow.

***

### id

> **id**: `string`

Unique id for the workflow, for invoking it with the CLI tool.

***

### input

> **input**: `I`

The input specific to this workflow.

***

### steps

> **steps**: [`WorkflowStep`](../type-aliases/WorkflowStep.md)\<`C`, `AnyStateMachine`\>[]

An array of steps to be executed in the workflow. Each step is a state machine, and a function which takes the context and returns the input for the state machine.

***

### templateFiles

> **templateFiles**: `Record`\<`string`, `string`\>

A map of ids to template file absolute paths which will be copied and updated as part of the workflow.
