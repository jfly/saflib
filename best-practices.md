# Best Practices

The following are rules that should be followed for _any_ software stack that aims to enable both human and AI agents work quickly and effectively. This stack follows and serves as an example implementation of these rules.

## Keep Files Small

This is most applicable to parts of the codebase where there are a number of the same thing. Components, routes, database queries. Each of these should live in a single file, rather than being grouped by domain (such as all CRUD operations for a single entity in one file). If any single instance of those grows to a larger size, it should be broken up into smaller pieces, such as sub-components, library methods, or transactions which depend on smaller queries.

This makes it simpler to provide the right context, and for that context to be contained. It also speeds up editing of these files as there's less surface area for the agent to work with when making changes.

## Specify and Enforce Shared APIs, Models, and Strings

Anything that is shared across system boundaries, such data structures or interfaces, should have a clear, independent source of truth. That source of truth should be used to enforce that model holds such as through type checking and/or schema validation.

This provides quick and straightforward feedback when a shared contract changes. It's easy to find what needs to adapt to the new contract, without the need for running automated tests, and is faster than even well-written and speedy unit tests.

There are many solutions for APIs, such as proto or OpenAPI. These are also good places to store shared models, which can be readily used as parameters or properties for functions or components as well as the network communications they help specify. Strings (such as urls and user-facing copy) can simply be stored independently from application logic, in maps such as JSON, where they can be referenced across components and tests.

## Mock, Fake, and Shim Service Boundaries

Mocks are code that behaves basically as the actual service would, responding and changing based on unsafe operations. Fakes are simply data which is returned, but does not handle unsafe network calls. Shims sit between the service and the consumer to limit access to what is needed.

Any non-trivial app will reach a point where it depends on separate services, either first or third party, and those should provide mocks and fakes as appropriate. This allows services to write unit or integration tests which don't depend on a live or fully-featured service. If the service is a large one with many features where the consumer only needs a subset, a shim will help manage how much of the service is truly depended on, and reduce the surface area to mock or provide fakes for.

Mocks are recommended for network calls between services (such as an application server making a grpc call to an identity server) or to external services (such as to a payment processor or LLM). Fakes are recommended for frontend applications, to ensure components render correctly given a set of network responses. Interactions with frontend that depend on network calls are better covered through E2E tests such as with playwright.

### Ownership of Mocks, Fakes, Shims

Mocks and fake data are often found adjacent to the consumer code that depends on them, but this logic should live with the service or integration owner. In practice, consumers of the mocks and fakes will end up writing and contributing most of them, most likely, but these should be kept and managed in a central location so to reduce redundant work and updates when shared models change.

Automated test are the next bulwark against breaking changes after static analysis. To test pieces of the application in isolation requires work at the integration points, and having clear expectations of who owns that work helps make sure that work gets done and is not done repeatedly.

## Keep Code Modular

Software should be broken up into packages which have a well-defined purpose, a public interface, and a list of dependencies. These packages should also not become too large in any of these regards.

This has similar benefits to "Keep Files Small"; it limits the required context for humans or agents to work.
