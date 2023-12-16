# Storefronend Backend API

The project consist of developing a RESTful API with a postgresSQL database. The API will manage the requests done from a frontend web store application like amazon.

## Goal

Architect a database, including its tables and columns, to meet the data requirements, and create a RESTful API that exposes, stores, and manages information for the frontend application.
See the REQUIREMENTS.md file.

## Features

- Include tests for API endpoints & database actions
- Provide user authentication [JWT](https://jwt.io/) (jsonwebtokens) & encryption (bycript)
- [PostgresSQL](https://hub.docker.com/_/postgres) docker database image
- Dockerfile and Docker Compose file
- Migration Db services

## Technlogies

We are using many libraries as specified in the package.json to accomplish this project.
However, the main technologies used in this project are:

- Node.js
  A JavaScript runtime built on Chrome's V8 engine to execute JS code server-side.
- Express
  Minimalist web framework for Node.js simplifying the creation of APIs web apps with rounting and middleware
- Typescript
  A Superset of JS adding static types among others, enhancing code maintainability and developer productivity
- eslint
  A tool for identifying and force common programming errors
- prettier
  A code formatter that automatically formats code ensuring styling consistent.
- jasmine & supertest
  A behavior-driven testing framework for JS and Superset allows testing HTTP assertions
- dotenv
  Module to loads environment variable from a '.env' file.
- CORS
  Middleware for Express enabling Cross-origin Resource Sharing
- pg
  A PostgreSQL client for Node.js for interaction with PosgreSQL database
- db-migrate
  Database migration tool for Node.js applications used to control and management databse schema changes
- db-migrate-pg
  A PostgreSQL database driver for the db-migrate tool, supports PostgreSQL-specific database migrations.
- bcrypt
  A password-hashing library for securely hash and compare passwords, used here to authentication
- jsonwebtoken
  Librared used for generating and verifying JSON Web Tokens (JWTs).
- winston & Kleur
  Logging library used together with kleur allowing not only transport options but also colors to improve readability of log outputs during development.

## How to install & start the database and server

### Requirements: Install Docker Desktop & Node.js

Before cloning the repository, make sure you have the docker desktop installed. It is necessary because I am using a docker-compose to spin a postgres docker image, copy the necessary config to it and execute the migration.

Make sure you have installed the [Docker Desktop](https://www.docker.com/products/docker-desktop/)

You will also need to install the [Node.js](https://nodejs.org/en) that comes with the npm (Node Package Manager).

### Clone the project repository

Install the dependencies and start the back-end server

```
npm install
npm run build
```

### Start Server & Database

It starts the RESTful server at localhost port 3001 & database in a docker image

```
npm run start
```

Another option below it so start the database and the server separately (on different consoles)

```
npm run start-server
```

Start the database

```
npm run start-database
```

## How to run the database

The database is a [PostgresSQL](https://hub.docker.com/_/postgres) docker image that runs automatically with the npm run start-database.

However, if you want to check some details, below are some commands:

Get the container id:

```
docker ps
```

Connect at CLI to the PostgresSQL database container using the docker and psql command with the appropriate options

```
docker exec -it <container-id> psql -U postgres
```

it should not prompt you to a password because is how the default authentication method is configured in the PostgreSQL image.
By default, the PostgreSQL Docker image uses "trust" authentication for connections from the same host (localhost or Docker containers on the same machine).
In the `pg_hba.conf`file (located in the PostgreSQL data directory (`/var/lib/postgresql/data`)), there is an entry that allows connections from the same host without requiring a password. This is called "trust" authentication.

## Doing some requests for the API

### Step 1

It is very advisable to use the [Postman](https://www.postman.com/) for that. At the github repository you can import the postman collection with all the endpoints.

Alterntive to Postman can be [Insomnia](https://insomnia.rest/)

### Step 2

Import the JSON file located at the root folder of this project, named "Udacity-FullStack-P-02.postman_collection.json", into Postman. There you will find all the endpoints that you can use to test the application.

## Testing the API through Jasmine

It will test all the API endpoints & database actions

```
npm run test
```

## Contributions

The Project was completed by me as a part of the FullStack Nanodegree Project. I fullfilled all the requirements and also implemented extra features.
