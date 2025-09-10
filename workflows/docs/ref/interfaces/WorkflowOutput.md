[**@saflib/workflows**](../index.md)

---

# Interface: WorkflowOutput

Outputs every workflow machine returns.

## Properties

### checklist

> **checklist**: `ChecklistItem`

Short descriptions of every step taken in the workflow. Can be used
either to generate a sample checklist for a workflow, or a summary
of the work done by a completed workflow. Workflows build these recursively.

---

### copiedFiles?

> `optional` **copiedFiles**: `Record`\<`string`, `string`\>

---

### newCwd?

> `optional` **newCwd**: `string`
