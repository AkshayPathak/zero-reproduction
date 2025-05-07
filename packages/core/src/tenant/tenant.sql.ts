import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "../drizzle/types";
import { createSelectSchema } from "drizzle-zod";

export const tenant = pgTable(
  "tenant",
  {
    ...id,
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("slug_idx").on(table.slug)],
);

export const tenantSchema = createSelectSchema(tenant).omit({
  createdAt: true,
  updatedAt: true,
});
