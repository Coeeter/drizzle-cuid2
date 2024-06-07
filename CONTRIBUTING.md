# Contributing guide for drizzle-cuid2

Thank you for considering contributing to drizzle-cuid2! This guide will help you get started.

## Table of contents

- [Development setup](#development-setup)
- [Running tests](#running-tests)
- [Creating a pull request](#creating-a-pull-request)

## Development setup

1. Clone the repository:

   ```sh
   git clone
   ```

2. Install the dependencies:

   ```sh
   pnpm install
   ```

3. If you don't have `pnpm` installed, you can install it by running:

   ```sh
   npm install -g pnpm
   ```

With the dependencies installed, you can start developing.

## Running tests

To run the tests, you can use the following command:

```sh
pnpm test
```

To run the tests in watch mode, you can use the following command:

```sh
pnpm vitest
```

## Creating a pull request

When you're ready to create a pull request, you can use the following steps:

1. Create a new branch:

   ```sh
   git checkout -b my-new-feature
   ```

2. Make a changeseet:

   ```sh
   pnpm changeset
   ```

   Make sure to follow the prompts and provide a description of your changes. This will create a new changeset in the `.changeset` directory.

3. Stage your changes and commit them:

   ```sh
   git commit -am 'Add some feature'
   ```

4. Push to the branch:

   ```sh
   git push origin my-new-feature
   ```

5. Create a new pull request on GitHub.

That's it! You've created a pull request. Thank you for contributing to drizzle-cuid2!
