import { isCuid } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { beforeEach, describe, expect, it } from "vitest";
import { cuid2 } from "../src/sqlite-core";
import { SQLiteCuid2 } from "../src/sqlite-core/builder";

const table = sqliteTable("users", {
  id: cuid2("id").defaultRandom().primaryKey(),
  name: text("name"),
});

describe("sqliteCuid2", () => {
  let column: (typeof table)["id"];
  let config: (typeof column)["config"];

  beforeEach(() => {
    column = table.id;
    // access protected member
    config = (column as unknown as { config: (typeof column)["config"] })
      .config;
  });

  it("should create a new instance of SQLiteCuid2", () => {
    expect(column).toBeInstanceOf(SQLiteCuid2);
  });

  it("should have the correct name", () => {
    expect(column.name).toBe("id");
  });

  it("should have the correct dataType", () => {
    expect(column.dataType).toBe("string");
  });

  it("should have the correct columnType", () => {
    expect(column.columnType).toBe("SQLiteCuid2");
  });

  it("should have a default value generator fn", () => {
    expect(config.defaultFn).toBeDefined();
  });

  it("should have a primary key", () => {
    expect(config.primaryKey).toBe(true);
  });

  it("should generate a valid cuid2", () => {
    const cuid2 = config.defaultFn?.();
    expect(typeof cuid2).toBe("string");
    expect(isCuid(cuid2 as string)).toBe(true);
  });

  it("should have a default value", () => {
    expect(config.hasDefault).toBe(true);
  });

  it("should not have a sql default", () => {
    expect(config.default).toBeUndefined();
  });

  it("should have the correct sql type", () => {
    expect(column.getSQLType()).toBe("text(24)");
  });
});

const customLengthTable = sqliteTable("users_custom_length", {
  id: cuid2("id").setLength(8).defaultRandom().primaryKey(),
  name: text("name"),
});

describe("sqliteCuid2 custom length", () => {
  let column: (typeof customLengthTable)["id"];
  let config: (typeof column)["config"];

  beforeEach(() => {
    column = customLengthTable.id;
    // access protected member
    config = (column as unknown as { config: (typeof column)["config"] })
      .config;
  });

  it("should create a new instance of SQLiteCuid2", () => {
    expect(column).toBeInstanceOf(SQLiteCuid2);
  });

  it("should have the correct name", () => {
    expect(column.name).toBe("id");
  });

  it("should have the correct dataType", () => {
    expect(column.dataType).toBe("string");
  });

  it("should have the correct columnType", () => {
    expect(column.columnType).toBe("SQLiteCuid2");
  });

  it("should have a default value generator fn", () => {
    expect(config.defaultFn).toBeDefined();
  });

  it("should have a primary key", () => {
    expect(config.primaryKey).toBe(true);
  });

  it("should generate a valid cuid2", () => {
    const cuid2 = config.defaultFn?.();
    expect(typeof cuid2).toBe("string");
    expect(isCuid(cuid2 as string)).toBe(true);
  });

  it("should have a default value", () => {
    expect(config.hasDefault).toBe(true);
  });

  it("should not have a sql default", () => {
    expect(config.default).toBeUndefined();
  });

  it("should have the correct sql type", () => {
    expect(column.getSQLType()).toBe("text(8)");
  });

  it("should generate a valid cuid2 with custom length", () => {
    const cuid2 = config.defaultFn?.();
    expect(typeof cuid2).toBe("string");
    expect(isCuid(cuid2 as string)).toBe(true);
    expect((cuid2 as string).length).toBe(8);
  });
});

const customPrefixTable = sqliteTable("users_custom_prefix", {
  id: cuid2("id").setPrefix("usr_").defaultRandom().primaryKey(),
  name: text("name"),
});

describe("sqliteCuid2 custom prefix", () => {
  let column: (typeof customPrefixTable)["id"];
  let config: (typeof column)["config"];

  beforeEach(() => {
    column = customPrefixTable.id;
    // access protected member
    config = (column as unknown as { config: (typeof column)["config"] })
      .config;
  });

  it("should create a new instance of SQLiteCuid2", () => {
    expect(column).toBeInstanceOf(SQLiteCuid2);
  });

  it("should have the correct name", () => {
    expect(column.name).toBe("id");
  });

  it("should have the correct dataType", () => {
    expect(column.dataType).toBe("string");
  });

  it("should have the correct columnType", () => {
    expect(column.columnType).toBe("SQLiteCuid2");
  });

  it("should have a default value generator fn", () => {
    expect(config.defaultFn).toBeDefined();
  });

  it("should have a primary key", () => {
    expect(config.primaryKey).toBe(true);
  });

  it("should generate a valid cuid2 with prefix", () => {
    const cuid2 = config.defaultFn?.();
    expect(typeof cuid2).toBe("string");
    expect((cuid2 as string).startsWith("usr_")).toBe(true);
  });

  it("should have a default value", () => {
    expect(config.hasDefault).toBe(true);
  });

  it("should not have a sql default", () => {
    expect(config.default).toBeUndefined();
  });

  it("should have the correct sql type", () => {
    expect(column.getSQLType()).toBe("text(28)");
  });
});

const customPrefixAndLengthTable = sqliteTable("users_custom_prefix_length", {
  id: cuid2("id").setPrefix("post_").setLength(16).defaultRandom().primaryKey(),
  name: text("name"),
});

describe("sqliteCuid2 custom prefix and length", () => {
  let column: (typeof customPrefixAndLengthTable)["id"];
  let config: (typeof column)["config"];

  beforeEach(() => {
    column = customPrefixAndLengthTable.id;
    // access protected member
    config = (column as unknown as { config: (typeof column)["config"] })
      .config;
  });

  it("should create a new instance of SQLiteCuid2", () => {
    expect(column).toBeInstanceOf(SQLiteCuid2);
  });

  it("should have the correct name", () => {
    expect(column.name).toBe("id");
  });

  it("should have the correct dataType", () => {
    expect(column.dataType).toBe("string");
  });

  it("should have the correct columnType", () => {
    expect(column.columnType).toBe("SQLiteCuid2");
  });

  it("should have a default value generator fn", () => {
    expect(config.defaultFn).toBeDefined();
  });

  it("should have a primary key", () => {
    expect(config.primaryKey).toBe(true);
  });

  it("should generate a valid cuid2 with prefix and custom length", () => {
    const cuid2 = config.defaultFn?.();
    expect(typeof cuid2).toBe("string");
    expect((cuid2 as string).startsWith("post_")).toBe(true);
    expect((cuid2 as string).length).toBe(21);
  });

  it("should have a default value", () => {
    expect(config.hasDefault).toBe(true);
  });

  it("should not have a sql default", () => {
    expect(config.default).toBeUndefined();
  });

  it("should have the correct sql type", () => {
    expect(column.getSQLType()).toBe("text(21)");
  });
});
