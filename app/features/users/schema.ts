import { pgSchema, pgTable, text, uuid, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core";

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

export const follows = pgTable("follows", {
  follower_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
  following_id: uuid().references(() => users.id, { onDelete: "cascade" }),
  created_at: timestamp().notNull().defaultNow(),
});
