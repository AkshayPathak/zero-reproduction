import { drizzle } from "drizzle-orm/postgres-js";
import { Resource } from "sst";
import { tenant } from "../tenant/tenant.sql";

import { people } from "../people/people.sql";
export * from "drizzle-orm";

export const schema = {
  tenant: tenant,
  people: people,
};

export const db = drizzle({
  connection: {
    host: Resource.Postgres.host,
    port: Resource.Postgres.port,
    user: Resource.Postgres.username,
    password: Resource.Postgres.password,
    database: Resource.Postgres.database,
    ssl: false,
  },
  schema,
});
