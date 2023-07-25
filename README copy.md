# Storefronend API

This image processing placeholder API allows you to get thumbnails from your images with fully and freely specified size (width and height) by you.

## Goal

Develop a simple placeholder API that enables you to insert thumbnails into your frontend with the size specified via URL parameters. It also functions as a library that serves properly scaled versions of your images/thumbnails to the frontend, reducing the page load size.

## Features

- Returns images.
- Returns thumbnails (resized images).
- Stores the resized image for the next request, saving processing and speed time.

## Technlogies

To accomplish this project, we are using the following technologies:

- Node.js
- Express
- Typescript
- eslint
- prettier
- jasmine & supertest
- sharp
- dotenv
- cors

## Docker Desktop

Make sure you have installed the Docker Desktop
https://www.docker.com/products/docker-desktop/

## How to install & start the server

Clone the repository

```
npm install
npm run build
npm run start
```

## How to run the docker

The docker will be running automatically with npm run start.

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

## Getting Images

Open the browser and type the address below, followed by any image name that you want to fetch in the "images" folder.

```
http://localhost:3000/encenadaport
```

## Getting Thumbnails

Open the browser and type the address below, followed by the image name, width, and height.

```
http://localhost:3000/images?filename=encenadaport&width=200&height=200
```

### Getting the index.html

This is just an extra. If you want to load the index.html file with some explanations, open the browser and type the following address:

```
http://localhost:3000/
```

## Contributions

The Image API Server was completed by me.
