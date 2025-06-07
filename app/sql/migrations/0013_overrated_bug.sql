ALTER TABLE "notifications" RENAME COLUMN "source_user_id" TO "source_id";--> statement-breakpoint
ALTER TABLE "notifications" RENAME COLUMN "target_user_id" TO "target_id";--> statement-breakpoint
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_source_user_id_profiles_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_target_user_id_profiles_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_source_id_profiles_profile_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_target_id_profiles_profile_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_or_parent_required" CHECK ((post_id IS NOT NULL AND parent_id IS NULL) OR (post_id IS NULL AND parent_id IS NOT NULL));