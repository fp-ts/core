# Contributing to `@fp-ts/core`

We welcome all contributions to the `@fp-ts/core` library. Your help makes the library better for everyone!

## Creating an Issue

Before you begin working on a contribution, it's important to create an issue that describes what you would like to build or improve. This helps to ensure that someone else isn't already working on something similar, and also helps the maintainers understand your goals.

## Development Workflow

1. Fork the repository on GitHub.
2. Clone your forked repository using the following command: `git clone git@github.com:{your_username}/core.git`
3. Install dependencies with `pnpm install`.
4. Make your contributions and commit your changes.
5. If you have made changes to the code, run `pnpm changeset` and select the appropriate level of change (`patch`, `minor`, `major`)

### Available Commands

- `pnpm build`: Deletes the `dist` folder and recompiles the `src` code into `dist`.
- `pnpm test`: Runs all vitest tests in watch mode.
- `pnpm coverage`: Runs all vitest tests and collects coverage information.
- `pnpm dtslint`: Runs type-level tests.

### Writing Tests

`@fp-ts/core` uses vitest for testing. After making your contributions, it's important to write tests to ensure that they work as intended. Before submitting your pull request, run `pnpm coverage` to make sure there are no unintended breaking changes and that your code has 100% coverage.

### Documentation

API documentation for `@fp-ts/core` can be found in the source code as JSDoc comments. Be sure to include documentation for any changes you make to the API.

## Licensing

By contributing your code to the `@fp-ts/core` GitHub repository, you agree to license your contribution under the MIT license.
