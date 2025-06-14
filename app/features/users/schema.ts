import {
  pgSchema,
  pgTable,
  text,
  uuid,
  timestamp,
  pgEnum,
  jsonb,
  bigint,
  primaryKey,
  boolean,
  check,
} from "drizzle-orm/pg-core";
import { products } from "../products/schema";
import { posts } from "../community/schema";
import { sql } from "drizzle-orm";

// 이 부분은 오직 Drizzle에게 테이블이 있다는 것을 알려주기 위해서 존재
const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const roles = pgEnum("role", [
  "developer",
  "designer",
  "marketer",
  "founder",
  "product_manager",
]);

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  avatar: text(),
  name: text().notNull(),
  username: text().notNull(),
  headline: text(),
  bio: text(),
  role: roles().default("developer").notNull(),
  stats: jsonb().$type<{
    followers: number;
    following: number;
  }>(),
  views: jsonb(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const follows = pgTable(
  "follows",
  {
    follower_id: uuid()
      .references(() => profiles.profile_id, { onDelete: "cascade" })
      .notNull(),
    following_id: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.follower_id, table.following_id] }),
    check("no_self_follow", sql`${table.follower_id} != ${table.following_id}`),
  ]
);

export const notificationType = pgEnum("notification_type", [
  "follow",
  "review",
  "reply",
  "mention",
]);

export const notifications = pgTable("notifications", {
  notification_id: bigint("notification_id", { mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  source_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
  target_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
  product_id: bigint("product_id", { mode: "number" }).references(() => products.product_id, {
    onDelete: "cascade",
  }),
  post_id: bigint("post_id", { mode: "number" }).references(() => posts.post_id, {
    onDelete: "cascade",
  }),
  seen: boolean().notNull().default(false).notNull(),
  type: notificationType().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const messageRooms = pgTable("message_rooms", {
  message_room_id: bigint("message_room_id", { mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const messageRoomMembers = pgTable(
  "message_room_members",
  {
    message_room_id: bigint("message_room_id", { mode: "number" })
      .references(() => messageRooms.message_room_id, {
        onDelete: "cascade",
      })
      .notNull(),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.message_room_id, table.profile_id] })]
);

export const messages = pgTable("messages", {
  message_id: bigint("message_id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
  message_room_id: bigint("message_room_id", { mode: "number" }).references(
    () => messageRooms.message_room_id,
    {
      onDelete: "cascade",
    }
  ),
  sender_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
  content: text().notNull(),
  seen: boolean().notNull().default(false),
  created_at: timestamp().notNull().defaultNow(),
});
