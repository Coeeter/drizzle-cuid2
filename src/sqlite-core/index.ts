import { SQLiteCuid2Builder, type SQLiteCuid2BuilderInitial } from './builder';

export function cuid2(): SQLiteCuid2BuilderInitial<''>;
export function cuid2<TName extends string>(
  name: TName
): SQLiteCuid2BuilderInitial<TName>;
export function cuid2<TName extends string>(
  name?: TName
): SQLiteCuid2BuilderInitial<TName> {
  return new SQLiteCuid2Builder(name ?? ('' as TName));
}

export * from './builder';
