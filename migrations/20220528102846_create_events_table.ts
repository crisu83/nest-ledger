import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE "events" (
      "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "type" varchar NOT NULL,
      "aggregate" varchar NOT NULL,
      "version" bigint NOT NULL,
      "payload" jsonb NOT NULL,
      "createdAt" timestamptz DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE "events" CASCADE;
  `);
}
