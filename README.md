# Backend Challenge

### Author

Alton Bell Smythe
abellsmythe@gmail.com

---

## Requirements

- NodeJS
- Docker

---

## Setup ⚙️

Open a new terminal and run the next commands in the projcet folder

#### Environment Variables

Let's make a copy of the required environment variables

```bash
cp .env.example .env
```

Now, we need to update the variables as we wish/need

```bash
vim .env
```

Take into consideration that the resulting `.env` file content should look similar to this

```
PORT=3000

# Database
POSTGRES_HOST=database
POSTGRES_DB=subscriptions_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin

DATABASE_URL=postgresql://admin:admin@database:5432/subscriptions_db
```

#### Database

For this project we use PostgreSQL as database

Let's setup our database!

```bash
docker compose up -d database
```

In this moment we should see a message that the container has started successfully, something similar to 

`✔ Container backend-challenge-database-1  Started`

If you want to review the services that are currently running, just run

```bash
docker compose ps
```

You will see something similar to 


| NAME | IMAGE | COMMAND | SERVICE | CREATED | STATUS | PORTS
|------|-------|---------|---------|---------|--------|---------
| backend-challenge-database-1 | postgres:16 | "docker-entrypoint.s…" | database | About a minute ago | Up About a minute | 0.0.0.0:5432->5432/tcp, :::5432->5432/tcp

When you are done remember to stop/shutdown the database

```bash
docker compose stop database
```

`✔ Container backend-challenge-database-1  Stopped`

---

## Up and running 🏃