# drizzle-cuid2

`drizzle-cuid2` is a utility package designed to generate CUIDs (Collision-resistant Unique Identifiers) for use with the Drizzle ORM. This library uses the `@paralleldrive/cuid2` package to provide unique and efficient IDs for your database entries.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Postgres example](#postgres-example)
  - [MySQL example](#mysql-example)
  - [SQLite example](#sqlite-example)
- [Issues](#issues)
- [License](#license)
- [Contributing](#contributing)
- [Changelog](#changelog)

## Installation

Installing with [npm](https://www.npmjs.com/):

```bash
npm install drizzle-cuid2
```

Installing with [yarn](https://yarnpkg.com/):

```bash
yarn add drizzle-cuid2
```

Installing with [pnpm](https://pnpm.io/):

```bash
pnpm add drizzle-cuid2
```

Installing with [bun](https://bun.sh/):

```bash
bun add drizzle-cuid2
```

`NOTE:` This package requires the `drizzle-orm` package to be installed in your project.

## Usage

To use `drizzle-cuid2`, you will need to import the `cuid2` function from the package and use it to define your table columns. The `cuid2` function returns a new column definition that can be used with the `drizzle-orm` package to define your tables.

This package supports the following database types:

- [Postgres](#postgres-example)
- [MySQL](#mysql-example)
- [SQLite](#sqlite-example)

### Postgres example:

```ts
import { pgTable } from 'drizzle-orm/pg-core';
import { cuid2 } from 'drizzle-cuid2/postgres';

export const users = pgTable('doctors', {
  id: cuid2('id').defaultRandom().primaryKey(),
  // other columns...
});

export const posts = pgTable('posts', {
  id: cuid2('id').defaultRandom().primaryKey(),
  userId: cuid2('user_id')
    .notNull()
    .references(() => users.id),
  // other columns...
});
```

or

```ts
import { pgTable } from 'drizzle-orm/pg-core';
import { pgCuid2 } from 'drizzle-cuid2';

export const users = pgTable('doctors', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  // other columns...
});

export const posts = pgTable('posts', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => users.id),
  // other columns...
});
```

### MySQL example:

```ts
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { cuid2 } from 'drizzle-cuid2/mysql';

export const users = mysqlTable('doctors', {
  id: cuid2('id').defaultRandom().primaryKey(),
  // other columns...
});

export const posts = mysqlTable('posts', {
  id: cuid2('id').defaultRandom().primaryKey(),
  userId: cuid2('user_id')
    .notNull()
    .references(() => users.id),
  // other columns...
});
```

or

```ts
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { mysqlCuid2 } from 'drizzle-cuid2';

export const users = mysqlTable('doctors', {
  id: mysqlCuid2('id').defaultRandom().primaryKey(),
  // other columns...
});

export const posts = mysqlTable('posts', {
  id: mysqlCuid2('id').defaultRandom().primaryKey(),
  userId: mysqlCuid2('user_id')
    .notNull()
    .references(() => users.id),
  // other columns...
});
```

### SQLite example:

```ts
import { sqliteTable } from 'drizzle-orm/sqlite-core';
import { cuid2 } from 'drizzle-cuid2/sqlite';

export const users = sqliteTable('doctors', {
  id: cuid2('id').defaultRandom().primaryKey(),
  // other columns...
});

export const posts = sqliteTable('posts', {
  id: cuid2('id').defaultRandom().primaryKey(),
  userId: cuid2('user_id')
    .notNull()
    .references(() => users.id),
  // other columns...
});
```

or

```ts
import { sqliteTable } from 'drizzle-orm/sqlite-core';
import { sqliteCuid2 } from 'drizzle-cuid2';

export const users = sqliteTable('doctors', {
  id: sqliteCuid2('id').defaultRandom().primaryKey(),
  // other columns...
});

export const posts = sqliteTable('posts', {
  id: sqliteCuid2('id').defaultRandom().primaryKey(),
  userId: sqliteCuid2('user_id')
    .notNull()
    .references(() => users.id),
  // other columns...
});
```

## Issues

If you find a bug or have a feature request, please report them in this repository's [issues section](https://github.com/Coeeter/drizzle-cuid2/issues).

## License

This package is licensed under the MIT license. See the [LICENSE](/LICENSE) file for more information.

## Contributing

If you would like to contribute to this project, please refer to the [CONTRIBUTING](/CONTRIBUTING.md) file for more information.

## Changelog

Please refer to the [CHANGELOG](/CHANGELOG.md) file for a complete list of changes.
