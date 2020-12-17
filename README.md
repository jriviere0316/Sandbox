# John Riviere's Sandbox App


This is an app to test and implement skills I have learned or am learning.  

User Authentication
Javascript
React
Redux
Hooks
Axios
Postgresql


This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

I recommend following these instructions carefully. It's a lot, and will take a moment to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone) 

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `sandbox` and create a the following tables:

```SQL
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
```

If you would like to name your database something else, you will need to change `sandbox` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

