# Backend Challenge

### Author

Alton Bell Smythe
abellsmythe@gmail.com

---

## Requirements

- NodeJS
- Docker

---

## Database 

![Database](./subscription-database.png)

#### General jeje

In general terms all the database tables will have some files
- `id` integer pk increments
- `created_at` datetime
- `updated_at` datetime
- `deleted_at` datetime

#### User
- `id` integer pk increments
- `email` string unique
- `first_name` string
- `last_name` string
- `password` string
- `avatar` string
- `role` enum

#### Customer
- `id` integer pk increments
- `user_id` integer unique > fk Users.id

> We have a `Customers` table just to make a difference in the billing from a regular user account, this should enable us to scale to a different billing approach, for this example is going to be 1:1, but we could potentially have billings for groups or organizations

#### Plan
- `id` integer pk increments
- `name` string
- `description` string
- `price` decimal
- `currency` enum
- `billing_frequency` enum
- `storage` integer
- `support_level` enum
- `analytics` enum
- `integrations` enum
- `annual_discount` integer

> The `Plans` table have a lot of fields to handle the features, this is assuming all of them are really stable and we are not adding many more features, otherwise it would be better to have a json field or a different approach to store them

#### Subscription
- `id` integer pk increments
- `customer_id` integer > fk Customers.id
- `plan_id` integer > fk Plans.id
- `status` enum
- `billing_frequency` enum
- `last_payment` date
- `next_payment` date
- `start_date` date
- `end_date` date null

#### Invoice
- `id` integer pk increments
- `customer_id` integer > fk Customers.id
- `subscription_id` integer > fk Subscriptions.id
- `status` string
- `amount` decimal
- `currency` string
- `due_date` date
- `billing_address` string
- `billing_zip_code` string
- `billing_country_code` string
- `billing_full_name` string

> Depending on the required future queries, it could be good idea to also have a `plan_id` tied to the invoice, in the case we want to query something like all the invoices from a particular plan of a customer, but I prefer to avoid that path as could introduce some data inconsistency just to avoid a join

#### Payment
- `id` integer pk increments
- `customer_id` integer > fk Customers.id
- `invoice_id` integer > fk Invoices.id
- `status` enun
- `amount` decimal
- `currency` enum
- `method` enum

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

#### Migrations

Now that our database is up and running we need to quickly setup the `app` service in order to run the migrations

```bash
docker compose build app
docker compose up -d app

docker compose exec app npm run database:migration
```

you should see something similar to 

```
Applying migration `20240126201343_init/`

The following migration(s) have been applied:

migrations/
  └─ 20240126201343_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v5.8.1) to ./node_modules/@prisma/client in 90ms
```

#### Seeding 🌱 

Once your database is up and the `migrations` are already done, we can seed our environment, just run the next command

```bash
docker compose exec app npm run database:seed
```

you should see something similar to

```
Environment variables loaded from .env
Running seed command `ts-node prisma/seed.ts` ...
Loading Plans . . .
Loading User abellsmythe@gmail.com
Loading Subscription for customer 1
Loading User paotoro94@gmail.com
Loading Subscription for customer 2
Loading User luke.bellsmythe@gmail.com
Loading Subscription for customer 3

🌱  The seed command has been executed.
```

Now if you access to the database you should have loaded 3 plans, 3 users (alton, pao and luke) with their corresponding customer and a subscription with a different plans for each one

---

## Up and running 🏃

If we already have the environment ready to go, we just need to up our services

```bash
docker compose up -d
```

That would up the `database` and `app` services

`✔ Container backend-challenge-database-1  Started`
`✔ Container backend-challenge-app-1       Started`

by running

```bash
docker compose ps
```

We should see the list of services and the corresponding port that is exposed 

| NAME | IMAGE | COMMAND | SERVICE | CREATED | STATUS | PORTS
|------|-------|---------|---------|---------|--------|---------
| backend-challenge-app-1 | backend-challenge-app | "docker-entrypoint.s…" | app | About a minute ago | Up About a minute | 0.0.0.0:3000->3000/tcp, :::3000->3000/tcp
| backend-challenge-database-1 | postgres:16 | "docker-entrypoint.s…" | database | About a minute ago | Up About a minute | 0.0.0.0:5432->5432/tcp, :::5432->5432/tcp

For this case we are exposing the **port** `3000`

> If you want to change the port check the `.env` file and remember to update the corresponding docker files

#### Prisma Studio

Now that everything is up and ready to go let's try something fun! 🥳
by running the next command we should be able to access the Prisma database studio

```bash
docker compose exec app npm run database
```

```bash
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555
```

![Prisma Studio](./prisma-studio.png)

> Keep in mind that we are also exposing the port `5555` in the docker configuration to access Prisma Studio, this shouldn't be exposed in **production**

#### Apollo Explorer

Now let's go and use the [Apollo Explorer](https://studio.apollographql.com/sandbox/explorer) 

Once you are in the page, remember to update the Sandbox URL to your local environment, that is to say, `http://localhost:3000/graphql`

You should see something similar

![Apollo Explorer](./apollo-explorer.png)
