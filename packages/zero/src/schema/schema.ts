import type { ExpressionBuilder } from "@rocicorp/zero";
import {
  ANYONE_CAN,
  createSchema,
  definePermissions,
  NOBODY_CAN,
} from "@rocicorp/zero";
import { tenantTable } from "./tenant";
import { peopleRelationships, peopleTable } from "./people";

export const schema = createSchema({
  tables: [tenantTable, peopleTable],
  relationships: [peopleRelationships],
});
export type Schema = typeof schema;

export const permissions = definePermissions<undefined, Schema>(schema, () => {
  return {
    tenant: { row: { select: ANYONE_CAN } },
    people: {
      row: {
        select: ANYONE_CAN,
      },
    },
  };
});
