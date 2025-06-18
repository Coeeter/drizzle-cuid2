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
  PgColumn,
  PgColumnBuilder,
  type AnyPgTable,
} from 'drizzle-orm/pg-core';

export type PgCuid2Config = {
  length: number;
};

const createId = (length: number) => init({ length });

export type PgCuid2BuilderInitial<TName extends string> = Omit<
  PgCuid2Builder<{
    name: TName;
    dataType: 'string';
    columnType: 'PgCuid2';
    data: string;
    driverParam: string;
    enumValues: undefined;
  }>,
  'default' | '$default' | '$defaultFn'
>;

export class PgCuid2Builder<
  T extends ColumnBuilderBaseConfig<'string', 'PgCuid2'>
> extends PgColumnBuilder<T> {
  static override readonly [entityKind]: string = 'PgCuid2Builder';
  private length = 24;

  constructor(name: T['name']) {
    super(name, 'string', 'PgCuid2');
  }

  build<TTableName extends string>(
    table: AnyPgTable<{ name: TTableName }>
  ): PgCuid2<MakeColumnConfig<T, TTableName>> {
    return new PgCuid2<MakeColumnConfig<T, TTableName>>(
      table,
      this.config as ColumnBuilderRuntimeConfig<
        T extends { $type: infer U } ? U : T['data'],
        PgCuid2Config
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

export class PgCuid2<
  T extends ColumnBaseConfig<'string', 'PgCuid2'>
> extends PgColumn<T> {
  static override readonly [entityKind]: string = 'PgCuid2';
  private length: number;

  constructor(
    table: AnyPgTable<{ name: string }>,
    config: ColumnBuilderRuntimeConfig<
      T extends { $type: infer U } ? U : T['data'],
      PgCuid2Config
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
