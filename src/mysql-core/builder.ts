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
  MySqlColumn,
  MySqlColumnBuilder,
  type AnyMySqlTable,
} from 'drizzle-orm/mysql-core';

export type MySqlCuid2Config = {
  length: number;
};

const createId = (length: number) => init({ length });

export type MySqlCuid2BuilderInitial<TName extends string> = Omit<
  MySqlCuid2Builder<{
    name: TName;
    dataType: 'string';
    columnType: 'MySqlCuid2';
    data: string;
    driverParam: string;
    enumValues: undefined;
  }>,
  'default' | '$default' | '$defaultFn'
>;

export class MySqlCuid2Builder<
  T extends ColumnBuilderBaseConfig<'string', 'MySqlCuid2'>
> extends MySqlColumnBuilder<T> {
  static override readonly [entityKind]: string = 'MySqlCuid2Builder';
  private length = 24;

  constructor(name: T['name']) {
    super(name, 'string', 'MySqlCuid2');
  }

  build<TTableName extends string>(
    table: AnyMySqlTable<{ name: TTableName }>
  ): MySqlCuid2<MakeColumnConfig<T, TTableName>> {
    return new MySqlCuid2<MakeColumnConfig<T, TTableName>>(
      table,
      this.config as ColumnBuilderRuntimeConfig<
        T extends { $type: infer U } ? U : T['data'],
        MySqlCuid2Config
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

export class MySqlCuid2<
  T extends ColumnBaseConfig<'string', 'MySqlCuid2'>
> extends MySqlColumn<T> {
  static override readonly [entityKind]: string = 'MySqlCuid2';
  private length: number;

  constructor(
    table: AnyMySqlTable<{ name: string }>,
    config: ColumnBuilderRuntimeConfig<
      T extends { $type: infer U } ? U : T['data'],
      MySqlCuid2Config
    >,
    length: number
  ) {
    super(table, config);
    this.length = length;
  }

  getSQLType(): string {
    return `varchar(${this.length})`;
  }
}
