import { init } from '@paralleldrive/cuid2';
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

export type SQLiteCuid2Config = {
  length: number;
};

const createId = (length: number) => init({ length });

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
  private length = 24;

  constructor(name: string) {
    super(name, 'string', 'SQLiteCuid2');
  }

  build<TTableName extends string>(
    table: AnySQLiteTable<{ name: TTableName }>
  ): SQLiteCuid2<MakeColumnConfig<T, TTableName>> {
    return new SQLiteCuid2<MakeColumnConfig<T, TTableName>>(
      table,
      this.config as ColumnBuilderRuntimeConfig<
        T extends { $type: infer U } ? U : T['data'],
        SQLiteCuid2Config
      >,
      this.length
    );
  }

  /***
   * Creates a random `cuid2` value as the default value for the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   */
  defaultRandom(): HasDefault<this> {
    this.config.defaultFn = () => createId(this.length)();
    this.config.hasDefault = true;
    return this as HasDefault<this>;
  }

  /***
   * Sets the length of the CUID2 value.
   * @param length The length of the CUID2 value (default: 24)
   */
  setLength(length: number): this {
    this.length = length;
    return this;
  }
}

export class SQLiteCuid2<
  T extends ColumnBaseConfig<'string', 'SQLiteCuid2'>
> extends SQLiteColumn<T> {
  static readonly [entityKind]: string = 'SQLiteCuid2';
  private length: number;

  constructor(
    table: AnySQLiteTable<{ name: string }>,
    config: ColumnBuilderRuntimeConfig<
      T extends { $type: infer U } ? U : T['data'],
      SQLiteCuid2Config
    >,
    length: number
  ) {
    super(table, config);
    this.length = length;
  }

  getSQLType(): string {
    return `text(${this.length})`;
  }
}
