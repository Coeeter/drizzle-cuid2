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
  prefix?: string;
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
  private prefix?: string;

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
      this.length,
      this.prefix
    );
  }

  /***
   * Creates a random `cuid2` value as the default value for the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   */
  defaultRandom(): HasDefault<this> {
    this.config.defaultFn = () => {
      const id = createId(this.length)();
      return this.prefix ? `${this.prefix}${id}` : id;
    };
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

  /***
   * Sets the prefix for the CUID2 value.
   * @param prefix The prefix to prepend to the CUID2 value
   */
  setPrefix(prefix: string): this {
    this.prefix = prefix;
    return this;
  }
}

export class SQLiteCuid2<
  T extends ColumnBaseConfig<'string', 'SQLiteCuid2'>
> extends SQLiteColumn<T> {
  static readonly [entityKind]: string = 'SQLiteCuid2';
  private length: number;
  private prefix?: string;

  constructor(
    table: AnySQLiteTable<{ name: string }>,
    config: ColumnBuilderRuntimeConfig<
      T extends { $type: infer U } ? U : T['data'],
      SQLiteCuid2Config
    >,
    length: number,
    prefix?: string
  ) {
    super(table, config);
    this.length = length;
    this.prefix = prefix;
  }

  getSQLType(): string {
    const totalLength = this.prefix ? this.length + this.prefix.length : this.length;
    return `text(${totalLength})`;
  }
}
