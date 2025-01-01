import { MySqlCuid2Builder, type MySqlCuid2BuilderInitial } from './builder';

export function cuid2(): MySqlCuid2BuilderInitial<''>;
export function cuid2<TName extends string>(
  name: TName
): MySqlCuid2BuilderInitial<TName>;
export function cuid2<TName extends string>(
  name?: TName
): MySqlCuid2BuilderInitial<TName> {
  return new MySqlCuid2Builder(name ?? ('' as TName));
}

export * from './builder';
