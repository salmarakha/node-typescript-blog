# Prisma Postgres Example: 

This project contains a sample application demonstrating various capabilities and workflows of [Prisma Postgres](https://prisma.io/data-platform/postgres):

### 1. Set up a Prisma Postgres database in Prisma Data Platform

Follow these steps to create your Prisma Postgres database:

1. Log in to [Prisma Data Platform](https://console.prisma.io/).
1. In a [workspace](https://www.prisma.io/docs/platform/about#workspace) of your choice, click the **New project** button.
1. Type a name for your project in the **Name** field, e.g. **hello-ppg**.
1. In the **Prisma Postgres** section, click the **Get started** button.
1. In the **Region** dropdown, select the region that's closest to your current location, e.g. **US East (N. Virginia)**.
1. Click the **Create project** button.

Once that setup process has finished, move to the next step.

### 2. Download example and install dependencies

Navigate into the project directory and install dependencies:

```
cd blog
npm install
```

### 3. Set database connection and Pulse API key

The connection to your database and the Pulse API key are configured via environment variables in a `.env` file.

Next, navigate back into the Console and click the **Generate API key** button.

Then, copy the resulting `DATABASE_URL` and `PULSE_API_KEY` environment variables and pase it into the `.env` file.

For reference, the file should now look similar to this:

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=ey...."
PULSE_API_KEY="ey...."
```

### 4. Create database tables (with a schema migration)

Next, you need to create the tables in your database. You can do this by creating and executing a schema migration with the following command of the Prisma CLI:

```
npm run migrate
```

Once the script has completed, you can inspect the logs in your terminal or use Prisma Studio to explore what records have been created in the database:

```
npx prisma studio
```

