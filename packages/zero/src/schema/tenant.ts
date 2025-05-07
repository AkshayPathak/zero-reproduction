import type { Row } from "@rocicorp/zero";
import { table, string } from "@rocicorp/zero";

export const tenantTable = table("tenant")
  .columns({
    id: string(),
    name: string(),
    slug: string(),
  })
  .primaryKey("id");

export type Tenant = Row<typeof tenantTable.schema>;
