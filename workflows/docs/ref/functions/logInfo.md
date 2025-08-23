[**@saflib/workflows**](../index.md)

***

# Function: logInfo()

> **logInfo**\<`C`, `E`\>(`cb`): `object`

Action builder for logging info messages.

## Type Parameters

| Type Parameter |
| ------ |
| `C` |
| `E` *extends* `AnyEventObject` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `cb` | `string` \| (`ctx`) => `string` |

## Returns

`object`

### params()

> **params**: (`event`) => `object`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `ActionParam`\<`C`, `E`\> |

#### Returns

`object`

##### level

> **level**: `"error"` \| `"info"` \| `"warn"`

##### msg

> **msg**: `string`

### type

> **type**: `"log"`
