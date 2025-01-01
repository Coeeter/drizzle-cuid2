import { isCuid } from '@paralleldrive/cuid2';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { beforeEach, describe, expect, it } from 'vitest';
import { cuid2 } from '../src/sqlite-core';
import { SQLiteCuid2 } from '../src/sqlite-core/builder';

const table = sqliteTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: text('name'),
});

describe('sqliteCuid2', () => {
  let column: (typeof table)['id'];
  let config: (typeof column)['config'];

  beforeEach(() => {
    column = table.id;
    // access protected member
    config = (column as unknown as { config: (typeof column)['config'] })
      .config;
  });

  it('should create a new instance of SQLiteCuid2', () => {
    expect(column).toBeInstanceOf(SQLiteCuid2);
  });

  it('should have the correct name', () => {
    expect(column.name).toBe('id');
  });

  it('should have the correct dataType', () => {
    expect(column.dataType).toBe('string');
  });

  it('should have the correct columnType', () => {
    expect(column.columnType).toBe('SQLiteCuid2');
  });

  it('should have a default value generator fn', () => {
    expect(config.defaultFn).toBeDefined();
  });

  it('should have a primary key', () => {
    expect(config.primaryKey).toBe(true);
  });

  it('should generate a valid cuid2', () => {
    const cuid2 = config.defaultFn?.();
    expect(typeof cuid2).toBe('string');
    expect(isCuid(cuid2 as string)).toBe(true);
  });

  it('should have a default value', () => {
    expect(config.hasDefault).toBe(true);
  });

  it('should not have a sql default', () => {
    expect(config.default).toBeUndefined();
  });

  it('should have the correct sql type', () => {
    expect(column.getSQLType()).toBe('text(24)');
  });
});
