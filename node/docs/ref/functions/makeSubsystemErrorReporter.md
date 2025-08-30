[**@saflib/node**](../index.md)

---

# Function: makeSubsystemErrorReporter()

> **makeSubsystemErrorReporter**(`subsystemName`, `operationName`, `logger`): [`ErrorReporter`](../type-aliases/ErrorReporter.md)

During setup, subsystems should use this to create their own
set of reporters. "Operation name" should be the name of the
function.

## Parameters

| Parameter       | Type     |
| --------------- | -------- |
| `subsystemName` | `string` |
| `operationName` | `string` |
| `logger`        | `Logger` |

## Returns

[`ErrorReporter`](../type-aliases/ErrorReporter.md)
