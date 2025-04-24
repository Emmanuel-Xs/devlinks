CREATE TABLE "user_usernames" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_usernames_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"username" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "user_usernames_username_unique" UNIQUE("username"),
	CONSTRAINT "user_usernames_userId_username_unique" UNIQUE("user_id","username")
);
--> statement-breakpoint
ALTER TABLE "user_usernames" ADD CONSTRAINT "user_usernames_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_usernames_user_id_idx" ON "user_usernames" USING btree ("user_id");