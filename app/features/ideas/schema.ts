import { bigint, integer, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const gptIdeas = pgTable("gpt_ideas", {
  gpt_idea_id: bigint("gpt_idea_id", { mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  idea: text("idea").notNull(),
  views: integer("views").notNull().default(0),
  claimed_at: timestamp("claimed_at"), // null 이라면 아직 클레임 안된 아이디어
  claimed_by: uuid("claimed_by").references(() => profiles.profile_id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const gptIdeasLikes = pgTable(
  "gpt_ideas_likes",
  {
    gpt_idea_id: bigint("gpt_idea_id", { mode: "number" }).references(() => gptIdeas.gpt_idea_id, {
      onDelete: "cascade",
    }),
    profile_id: uuid("profile_id").references(() => profiles.profile_id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.gpt_idea_id, table.profile_id] })]
);
