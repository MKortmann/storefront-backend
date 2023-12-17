# Storefronend Backend API

The project consist of developing a RESTful API with a PostgreSQL database. The API will manage the requests done from a frontend web store application like amazon.

## Goal

Architect a database, including its tables and columns, to meet the data requirements, and create a RESTful API that exposes, stores, and manages information for the frontend application.
See the REQUIREMENTS.md & INSTRUCTIONS.md files.

## Features

- Include tests for API endpoints & database actions
- Provide user authentication [JWT](https://jwt.io/) (jsonwebtokens) & encryption (bycript)
- [PostgreSQL](https://hub.docker.com/_/postgres) docker database image
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

_For any problems, do not forget to check the Troubleshooting section_

### Summary step by step

1. **Install Docker Desktop & Node.js**

Before cloning the repository, make sure you have the docker desktop installed and running. It is necessary because I am using docker-technology. The docker engine will start with a docker-compose to spin a postgres docker image, copy the necessary config to it and execute the migration.

Make sure you have installed the [Docker Desktop](https://www.docker.com/products/docker-desktop/)

You will also need to install the [Node.js](https://nodejs.org/en) that comes with the npm (Node Package Manager).

2. **Start the Docker Engine**

3. **Clone the project repository**

4. **Install the dependencies**

```
npm install
```

5. Rename the **.env copy file to .env**. This file contains the environment variables

   > As you can see, in this file we define the RESTful API port, the host machine port to connect to the container _5433_, the databases, bcrypt password, and so on. _In fact, I must never put this in the GitHub Repository, but it is just for learn purpose._

6. **Start RESTful Server & Database**

- Makes sure the docker engine is running. For that, just start the docker service.

It starts the RESTful server at localhost port 3001 & database in a docker image

At WSL or linux:

```
npm run start
```

At Windows:

```
npm run start-on-windows
```

Another option below it so start the database and the server separately (on different consoles)

```
npm run start-server
```

Start the database

```
npm run start-database
```

7. **Install postman**
8. **Import postman collection at rootfolder called: Udacity-FullStack-P-02.postman_collection**
9. **Congratulations!! You are ready now to make requests and test the application**

## A Short Technical Explaining of the project

This backend project is composed of two parts:

1. docker container that runs a PostgreSQL database.

2. RESTful API running at port 3001 that intercept requests from the client. The client can be a web app or other application and is not part of this project. It will come in the project 03.

Explanation of part 1: _docker container that runs a postgres image with a PostgreSQL database_

As explained above, to start part 01 you just run: npm run _start-database_. It just start the trigger the docker engine to start the docker-compose build & docker-compose up.

> the docker-compose.yml file defines a set of services and configurations for running docker containers.

So, the command: docker-compose build: is used to build & update docker images (e.g.: postgres:latest) based in our _docker-compose.yml_ file. Our docker-compose file specifies three services.

1. db: build the postgres image specified at the Dockerfile. At this Dockerfile we basically load this image, update, install the necessary javacript libraries as npm and _db-migrate_ and *db-migrate-pg'.
   *Migrations\* helps us to update and rollback the database schema. Example: we can create tables, add data to it through SQL. It helps us not only to track the database versions allowing it easy share between applications but also, in our case, to start with a database with mockup data ready to test it.

   > More Info: check migrations -> sqls folder

2. migration_dev: here I execute the database migrations as soon as the database is ready

3. migration_test: same as migration_Dev but I am executing the migrations in the test environment.

> The Dockerfile just uses the latest image of the PostgreSQL, set some config, update and install the necessary libraries.

Explanation of part 2: RESTful API running at port 3001

The server.ts is the entry point of the RESTful API where I import the necessary libraries, set the express app to be able to use _cors_ (middleware to handle Cross-Origin Resource Sharing) and other middlewares, route handling (adding routes for order, user and product), through the module _dotenv_ load environment variables, initialize the server to listen on a port specified in the environment variables.

## How to log/debug the database

The database is a [PostgreSQL](https://hub.docker.com/_/postgres) docker image that runs automatically with the npm run start-database.

However, if you want to check some details, below are some commands:

Get the container id:

```
docker ps
```

Connect at CLI to the PostgreSQL database container using the docker and psql command with the appropriate options

```
docker exec -it <container-id> psql -U postgres
```

it should not prompt you to a password because is how the default authentication method is configured in the PostgreSQL image.
By default, the PostgreSQL Docker image uses "trust" authentication for connections from the same host (localhost or Docker containers on the same machine).
In the `pg_hba.conf`file (located in the PostgreSQL data directory (`/var/lib/postgresql/data`)), there is an entry that allows connections from the same host without requiring a password. This is called "trust" authentication.

Some commands to debug it

List the databases

```
\l
```

Connect to a specific database

```
\c <database-name>
```

You can use SQL commands to check the tables, e.g.:

```
SELECT * FROM orders;
```

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

## Troubleshooting

- Problem 1: problem by running the _npm run start_ or _npm run start-on-windows_

Or run separately the two commands: _npm run start-server_ and _npm run start-databse_

- Problem 2: at npm install command

If you got problems running npm run start-database or npm run start-server for any reason. Just try the flag: --force, like:

```
npm run start-database --force
```

- Problem 3: missing .env file

Just rename at root folder the file: _.env copy_ to _.env_

## Contributions

The Project was completed by me as a part of the FullStack Nanodegree Project. I fullfilled all the requirements and also implemented many extra features.
