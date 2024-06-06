import { createId } from '@paralleldrive/cuid2';
import {
  type ColumnBuilderRuntimeConfig,
  entityKind,
  type ColumnBaseConfig,
  type ColumnBuilderBaseConfig,
  type MakeColumnConfig,
  type HasDefault,
} from 'drizzle-orm';
import {
  SQLiteColumn,
  SQLiteColumnBuilder,
  type AnySQLiteTable,
} from 'drizzle-orm/sqlite-core';

export type SQLiteCuid2BuilderInitial<TName extends string> = Omit<
  SQLiteCuid2Builder<{
    name: TName;
    dataType: 'string';
    columnType: 'SQLiteCuid2';
    data: string;
    driverParam: string;
    enumValues: undefined;
  }>,
  'default' | '$default' | '$defaultFn'
>;

export class SQLiteCuid2Builder<
  T extends ColumnBuilderBaseConfig<'string', 'SQLiteCuid2'>
> extends SQLiteColumnBuilder<T> {
  static readonly [entityKind]: string = 'SQLiteCuid2Builder';

  constructor(name: string) {
    super(name, 'string', 'SQLiteCuid2');
  }

  build<TTableName extends string>(
    table: AnySQLiteTable<{ name: TTableName }>
  ): SQLiteCuid2<MakeColumnConfig<T, TTableName>> {
    return new SQLiteCuid2<MakeColumnConfig<T, TTableName>>(
      table,
      this.config as ColumnBuilderRuntimeConfig<any, any>
    );
  }

  /***
   * Creates a random `cuid2` value as the default value for the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   */
  defaultRandom(): HasDefault<this> {
    this.config.defaultFn = () => createId();
    this.config.hasDefault = true;
    return this as HasDefault<this>;
  }
}

export class SQLiteCuid2<
  T extends ColumnBaseConfig<'string', 'SQLiteCuid2'>
> extends SQLiteColumn<T> {
  static readonly [entityKind]: string = 'SQLiteCuid2';

  getSQLType(): string {
    return `varchar(32)`;
  }
}

export function sqliteCuid2<TName extends string>(
  name: TName
): SQLiteCuid2BuilderInitial<TName> {
  return new SQLiteCuid2Builder(name);
}
