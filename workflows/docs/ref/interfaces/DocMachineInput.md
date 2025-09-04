[**@saflib/workflows**](../index.md)

***

# Interface: DocMachineInput

## Extends

- `WorkflowInput`

## Properties

### copiedFiles?

> `optional` **copiedFiles**: `Record`\<`string`, `string`\>

#### Inherited from

`WorkflowInput.copiedFiles`

***

### docFiles?

> `optional` **docFiles**: `Record`\<`string`, `string`\>

#### Inherited from

`WorkflowInput.docFiles`

***

### docId

> **docId**: `string`

***

### dryRun?

> `optional` **dryRun**: `boolean`

Flag to skip all execution of the workflow. Used mainly to get a checklist.

#### Inherited from

`WorkflowInput.dryRun`

***

### loggedLast?

> `optional` **loggedLast**: `boolean`

#### Inherited from

`WorkflowInput.loggedLast`

***

### rootRef?

> `optional` **rootRef**: `AnyActorRef`

#### Inherited from

`WorkflowInput.rootRef`

***

### systemPrompt?

> `optional` **systemPrompt**: `string`

#### Inherited from

`WorkflowInput.systemPrompt`

***

### templateFiles?

> `optional` **templateFiles**: `Record`\<`string`, `string`\>

#### Inherited from

`WorkflowInput.templateFiles`
