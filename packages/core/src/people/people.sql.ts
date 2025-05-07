import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { ids, timestamps } from "../drizzle/types";

export const people = pgTable(
  "people",
  {
    ...ids,
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.tenantId, table.id] })],
);
