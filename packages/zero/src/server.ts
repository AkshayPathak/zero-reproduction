import "dotenv/config";
import {
  ZQLDatabase,
  PostgresJSConnection,
  PushProcessor,
} from "@rocicorp/zero/pg";
import { Hono } from "hono";
import postgres from "postgres";
import { createMutators } from "./mutators";
import { schema } from "./schema/schema";
import { serve } from "@hono/node-server";

export const app = new Hono().basePath("/api");

const processor = new PushProcessor(
  new ZQLDatabase(
    new PostgresJSConnection(
      postgres("postgresql://postgres:password@localhost:5432/new_zero"),
    ),
    schema,
  ),
);

app.post("/push", async (c) => {
  const result = await processor.process(
    createMutators(),
    c.req.query(),
    await c.req.json(),
  );
  return c.json(result);
});

serve(
  {
    fetch: app.fetch,
    port: 5173,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
