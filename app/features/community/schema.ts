import {
  bigint,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const topics = pgTable("topics", {
  topic_id: bigint("topic_id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  post_id: bigint("post_id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  upvotes: bigint({ mode: "number" }).default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  topic_id: bigint("topic_id", { mode: "number" }).references(() => topics.topic_id, {
    onDelete: "cascade",
  }),
  profile_id: uuid("profile_id").references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
});

export const postUpvotes = pgTable(
  "post_upvotes",
  {
    post_id: bigint("post_id", { mode: "number" }).references(() => posts.post_id, {
      onDelete: "cascade",
    }),
    profile_id: uuid("profile_id").references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => [primaryKey({ columns: [table.post_id, table.profile_id] })]
);

export const postReplies = pgTable("post_replies", {
  reply_id: bigint("reply_id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  reply: text("reply").notNull(),
  post_id: bigint("post_id", { mode: "number" }).references(() => posts.post_id, {
    onDelete: "cascade",
  }),
  profile_id: uuid("profile_id").references((): AnyPgColumn => profiles.profile_id, {
    onDelete: "cascade",
  }),
  // drizzle에서는 자신을 참조하면 에러가 나는데, 이는 TypeScript의 한계로 인한 것. 이를 해결하기 위해서는 AnyPgColumn을 사용해야 한다.
  parent_id: bigint("parent_id", { mode: "number" }).references(
    (): AnyPgColumn => postReplies.reply_id,
    {
      onDelete: "cascade",
    }
  ),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
