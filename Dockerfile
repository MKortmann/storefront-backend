FROM postgres:latest

# Set an environment variable to prevent prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# sets the working directory inside the container
WORKDIR /app/config

# apt-get to update the package list, install npm and clean up to reduce image size
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm

RUN npm install -g db-migrate \
    && npm install -g db-migrate-pg

# Just for init script - automatically execute SQL scripts over init
# COPY migrations/sqls /docker-entrypoint-initdb.d/
# The config file database.json for diff env. will be there available
COPY database.json /app/config/

# Set the entrypoint to run db-migrate up for the 'dev' environment
# ENTRYPOINT ["db-migrate", "up", "--config", "database.json", "-e", "dev"]
