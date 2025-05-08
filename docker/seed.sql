CREATE DATABASE new_zero;

-- Connect to the new_zero database
\c new_zero;

CREATE TABLE "people" (
	"id" char(26) NOT NULL,
	"tenant_id" char(26) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "people_tenant_id_id_pk" PRIMARY KEY("tenant_id","id")
);
--> statement-breakpoint
CREATE TABLE "tenant" (
	"id" char(26) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "slug_idx" ON "tenant" USING btree ("slug");

--> statement-breakpoint
-- Seed a single tenant
INSERT INTO "tenant" ("id", "name", "slug") 
VALUES ('01HJ5RXMNYGCYKY4WQWPFGZY0S', 'Acme Corporation', 'acme');

--> statement-breakpoint
-- Seed a few people
INSERT INTO "people" ("id", "tenant_id", "first_name", "last_name") 
VALUES 
  ('01HJ5S1S3WDTX74RPQWMF40Y6G', '01HJ5RXMNYGCYKY4WQWPFGZY0S', 'Mike', 'Moe'),
  ('01HJ5S29VH9WF2MVGP9FZBH0ZM', '01HJ5RXMNYGCYKY4WQWPFGZY0S', 'Bob', 'Smith'),
  ('01HJ5S3D6K7SXY5VY991BN6QBZ', '01HJ5RXMNYGCYKY4WQWPFGZY0S', 'Michael', 'Johnson');

