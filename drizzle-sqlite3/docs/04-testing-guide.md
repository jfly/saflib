# Testing Guide

Things to keep an eye out for when writing tests for the SQLite layer.

## Database Instantiation

When testing database queries, always use the package's exported database manager rather than creating database instances directly. This ensures you're testing the same code path that consumers of your package will use.

It will look like this:

```typescript
import { mainDb } from "@your-org/your-db-package";
import type { DbKey } from "@saflib/drizzle-sqlite3";

describe("such-and-such query", () => {
  let dbKey: DbKey;

  beforeEach(() => {
    dbKey = mainDb.connect(); // Use the package's manager
  });

  afterEach(() => {
    mainDb.disconnect(dbKey);
  });

  it("should do something", async () => {
    const { result } = await mainDb.someDomain.list(dbKey);
    // ... assertions
  });
});
```

See also [this identity example](https://github.com/sderickson/saflib/blob/4871050da4a2c51be9606a58df0d87089e85fea7/identity/identity-db/queries/users/get-by-id.test.ts).

## Coverage

Database queries should aim for 100% coverage. This includes error handling. For any error they return, there should be a known set of steps to reproduce that error, and those should be in a test. If there's no known way to cause a "handled" error to be returned, then that logic should be removed.
