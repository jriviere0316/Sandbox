-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "taskName" VARCHAR (50),
    "isComplete" BOOLEAN 
);

CREATE TABLE "equations" (
    "id" SERIAL PRIMARY KEY,
    "fullEquation" VARCHAR (1000)
);
