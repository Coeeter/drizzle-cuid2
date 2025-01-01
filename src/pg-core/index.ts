import { PgCuid2Builder, type PgCuid2BuilderInitial } from './builder';

export function cuid2(): PgCuid2BuilderInitial<''>;
export function cuid2<TName extends string>(
  name: TName
): PgCuid2BuilderInitial<TName>;
export function cuid2<TName extends string>(
  name?: TName
): PgCuid2BuilderInitial<TName> {
  return new PgCuid2Builder(name ?? ('' as TName));
}

export * from './builder';
