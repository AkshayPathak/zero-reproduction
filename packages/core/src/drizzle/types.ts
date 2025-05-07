import { char, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { createId } from "../util/id";

export const ulid = (name: string) => char(name, { length: 26 });

export const id = {
  get id() {
    return ulid("id")
      .$defaultFn(() => createId())
      .primaryKey();
  },
};

export const ids = {
  get id() {
    return ulid("id")
      .notNull()
      .$defaultFn(() => createId());
  },
  get tenantId() {
    return ulid("tenant_id").notNull();
  },
};

export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
};
