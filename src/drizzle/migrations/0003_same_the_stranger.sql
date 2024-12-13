CREATE TABLE "password_reset_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"email" text NOT NULL,
	"code" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "password_reset_sessions_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "password_reset_sessions" ADD CONSTRAINT "password_reset_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;