import {
  relationships,
  string,
  table,
  number,
  type Row,
  enumeration,
} from "@rocicorp/zero";
import { tenantTable } from "./tenant";

export const peopleTable = table("people")
  .columns({
    id: string(),
    tenant_id: string(),
    first_name: string(),
    last_name: string(),
  })
  .primaryKey("tenant_id", "id");

export const peopleRelationships = relationships(peopleTable, ({ one }) => ({
  tenant: one({
    sourceField: ["tenant_id"],
    destSchema: tenantTable,
    destField: ["id"],
  }),
}));

export type People = Row<typeof peopleTable.schema>;
export type PeopleUpdate = Required<Pick<People, "id" | "tenant_id">> &
  Partial<People>;
export type PeopleDelete = Required<Pick<People, "id" | "tenant_id">>;
