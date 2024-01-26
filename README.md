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

```bash
docker compose stop database
```

`✔ Container backend-challenge-database-1  Stopped`

---

## Up and running 🏃