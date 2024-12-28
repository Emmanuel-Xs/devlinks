CREATE TYPE "public"."platforms" AS ENUM('github', 'frontendmentor', 'twitter', 'linkedin', 'youtube', 'facebook', 'twitch', 'dev.to', 'codewars', 'codepen', 'freecodecamp', 'gitlab', 'hashnode', 'stackoverflow');--> statement-breakpoint
CREATE TABLE "links" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"sequence" integer NOT NULL,
	"url" text NOT NULL,
	"platform" "platforms" DEFAULT 'github',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "links_userId_sequence_unique" UNIQUE("user_id","sequence")
);
--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "links_platform_idx" ON "links" USING btree ("platform");