# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set an environment variable to prevent prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory to /app/config
WORKDIR /app/config

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install a specific version of npm (if needed, specify the version)
RUN npm install -g npm

# Install db-migrate and db-migrate-pg globally
RUN npm install -g db-migrate \
    && npm install -g db-migrate-pg

# Just for init script - automatically execute SQL scripts over init
# COPY migrations/sqls /docker-entrypoint-initdb.d/
#
# Copy the database.json file into the expected location for db-migrate
COPY database.json /app/config/


# Set the entrypoint to run db-migrate up for the 'dev' environment
# ENTRYPOINT ["db-migrate", "up", "--config", "database.json", "-e", "dev"]
