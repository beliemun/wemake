import {
  pgTable,
  bigint,
  text,
  timestamp,
  integer,
  pgEnum,
  check,
  uuid,
} from "drizzle-orm/pg-core";
import { PRODUCT_STAGE } from "./constants";
import { sql } from "drizzle-orm";
import { profiles } from "../users/schema";

export const product_stage = pgEnum(
  "product_stage",
  PRODUCT_STAGE.map((stage) => stage.value) as [string, ...string[]]
);

export const teams = pgTable(
  "teams",
  {
    team_id: bigint("team_id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    product_name: text("product_name").notNull(),
    team_size: integer("team_size").notNull(),
    equity_split: integer("equity_split").notNull(),
    roles: text("roles").notNull(),
    product_description: text("product_description").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
    team_leader_id: uuid("team_leader_id")
      .references(() => profiles.profile_id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => [
    check("team_size_check", sql`${table.team_size} BETWEEN 1 AND 100`),
    check("equity_split_check", sql`${table.equity_split} BETWEEN 1 AND 100`),
    check("product_description_check", sql`LENGTH(${table.product_description}) <= 200`),
  ]
);
