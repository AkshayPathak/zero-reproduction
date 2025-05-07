import {
  ZQLDatabase,
  PostgresJSConnection,
  PushProcessor,
} from "@rocicorp/zero/pg";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import postgres from "postgres";
import { createMutators } from "./mutators";
import { schema } from "./schema/schema";

export const app = new Hono().basePath("/api");

const processor = new PushProcessor(
  new ZQLDatabase(
    new PostgresJSConnection(postgres(process.env.ZERO_UPSTREAM_DB as string)),
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

export const handler = handle(app);
