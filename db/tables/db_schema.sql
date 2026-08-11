CREATE TABLE "users"(
    "id" bigserial NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NULL,
    "last_name" VARCHAR(100) NULL,
    "date_of_birth" DATE NULL,
    "weight" INTEGER NULL,
    "height" INTEGER NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
CREATE TABLE "workout_session"(
    "id" bigserial NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "name" VARCHAR(100) NULL
);
ALTER TABLE
    "workout_session" ADD PRIMARY KEY("id");
CREATE TABLE "muscle_group"(
    "id" bigserial NOT NULL,
    "target_group" VARCHAR(100) NOT NULL
);
ALTER TABLE
    "muscle_group" ADD PRIMARY KEY("id");
CREATE TABLE "exercise"(
    "id" bigserial NOT NULL,
    "exercise_name" VARCHAR(150) NOT NULL,
    "muscle_group_id" BIGINT NOT NULL
);
ALTER TABLE
    "exercise" ADD PRIMARY KEY("id");
CREATE TABLE "workout_set"(
    "id" bigserial NOT NULL,
    "workout_session_id" BIGINT NOT NULL,
    "exercise_id" BIGINT NOT NULL,
    "set_number" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NULL
);
ALTER TABLE
    "workout_set" ADD PRIMARY KEY("id");
ALTER TABLE
    "workout_session" ADD CONSTRAINT "workout_session_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "workout_set" ADD CONSTRAINT "workout_set_exercise_id_foreign" FOREIGN KEY("exercise_id") REFERENCES "exercise"("id");
ALTER TABLE
    "workout_set" ADD CONSTRAINT "workout_set_workout_session_id_foreign" FOREIGN KEY("workout_session_id") REFERENCES "workout_session"("id");
ALTER TABLE
    "exercise" ADD CONSTRAINT "exercise_muscle_group_id_foreign" FOREIGN KEY("muscle_group_id") REFERENCES "muscle_group"("id");