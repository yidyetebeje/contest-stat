DO $$ BEGIN
 CREATE TYPE "public"."participant_type" AS ENUM('CONTESTANT', 'VIRTUAL', 'PRACTICE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."school" AS ENUM('AASTU', 'AAiT', 'Ghana', 'ASTU');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contest" (
	"contest_id" text,
	"name" text,
	"no_questions" integer,
	CONSTRAINT "contest_contest_id_unique" UNIQUE("contest_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contest_interaction" (
	"contest_id" text,
	"cf_handle" text,
	"rank" integer,
	"no_solved" integer,
	"participant_type" "participant_type",
	"penality" integer,
	CONSTRAINT "contest_interaction_cf_handle_contest_id_pk" PRIMARY KEY("cf_handle","contest_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"name" text,
	"group" text NOT NULL,
	"school" "school",
	"cf_handle" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contest_interaction" ADD CONSTRAINT "contest_interaction_contest_id_contest_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."contest"("contest_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contest_interaction" ADD CONSTRAINT "contest_interaction_cf_handle_student_cf_handle_fk" FOREIGN KEY ("cf_handle") REFERENCES "public"."student"("cf_handle") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
