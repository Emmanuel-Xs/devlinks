ALTER TYPE "public"."platforms" ADD VALUE 'portfolio';--> statement-breakpoint
ALTER TYPE "public"."platforms" ADD VALUE 'others';--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "id" DROP IDENTITY;
--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "id" SET DATA TYPE text;