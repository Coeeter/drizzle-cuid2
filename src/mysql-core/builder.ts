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
  MySqlColumn,
  MySqlColumnBuilder,
  type AnyMySqlTable,
} from 'drizzle-orm/mysql-core';

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

  constructor(name: T['name']) {
    super(name, 'string', 'MySqlCuid2');
  }

  build<TTableName extends string>(
    table: AnyMySqlTable<{ name: TTableName }>
  ): MySqlCuid2<MakeColumnConfig<T, TTableName>> {
    return new MySqlCuid2<MakeColumnConfig<T, TTableName>>(
      table,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
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

export class MySqlCuid2<
  T extends ColumnBaseConfig<'string', 'MySqlCuid2'>
> extends MySqlColumn<T> {
  static override readonly [entityKind]: string = 'MySqlCuid2';

  getSQLType(): string {
    return `varchar(24)`;
  }
}
