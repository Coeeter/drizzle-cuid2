import { MySqlCuid2Builder, type MySqlCuid2BuilderInitial } from './builder';

export function cuid2<TName extends string>(
  name: TName
): MySqlCuid2BuilderInitial<TName> {
  return new MySqlCuid2Builder(name);
}
