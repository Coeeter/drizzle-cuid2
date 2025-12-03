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
  prefix?: string;
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
  private prefix?: string;

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

export class MySqlCuid2<
  T extends ColumnBaseConfig<'string', 'MySqlCuid2'>
> extends MySqlColumn<T> {
  static override readonly [entityKind]: string = 'MySqlCuid2';
  private length: number;
  private prefix?: string;

  constructor(
    table: AnyMySqlTable<{ name: string }>,
    config: ColumnBuilderRuntimeConfig<
      T extends { $type: infer U } ? U : T['data'],
      MySqlCuid2Config
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
    return `varchar(${totalLength})`;
  }
}
