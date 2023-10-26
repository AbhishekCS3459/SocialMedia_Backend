# Social Media Backend Build Using Graphql,Redis etc.

This is the README file for the **Social Media Backend** project, which includes a Docker Compose configuration and a Node.js application. The project utilizes Docker to set up a PostgreSQL database and a Redis server for development purposes. Additionally, it is built with TypeScript and utilizes popular GraphQL and Prisma libraries to create a GraphQL API server.

## Prerequisites

Before getting started, ensure you have the following software installed on your system:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)

## Getting Started




### Using Gitpod

You can also run this project in a Gitpod workspace, which provides a development environment in the cloud. Click the link below to open this repository in a Gitpod workspace:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/your-username/GraphQl_Nodejs_Backend)

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/AbhishekCS3459/GraphQl_Nodejs_Backend
cd Social Media Backend
```

### 2. Docker Compose Setup

The project includes a `docker-compose.yml` file that defines two services: PostgreSQL and Redis. To set up these services, run the following command in the project root directory:

```bash
docker-compose up -d
```

This command will create and start containers for PostgreSQL and Redis. You can access PostgreSQL on port 5432 and Redis on port 6379.

### 3. Install Node.js Dependencies

Next, you need to install the Node.js dependencies for the GraphQL server. Run the following command in the project root directory:

```bash
npm install
```

### 4. Prisma Setup

This project uses Prisma for database management. Before you can run the GraphQL server, you need to generate the Prisma client. Use the following command:

```bash
npx prisma generate
```

### 5. Start the GraphQL Server

You can start the GraphQL server with the following command:

```bash
npm run dev
```

The server will be available at [http://localhost:8000/graphql](http://localhost:8000/graphql).

### 6. Using the GraphQL API

You can now use your GraphQL API to interact with the database. Open a GraphQL client, like [Apollo Studio](https://studio.apollographql.com/), and start sending queries and mutations.

## Project Structure

- **docker-compose.yml**: Defines the Docker services for PostgreSQL and Redis.
- **package.json**: Node.js project configuration file with dependencies and scripts.
- **src**: Contains the source code for the GraphQL server.
- **prisma**: Contains Prisma configuration and database schema.

## License

This project is licensed under the MIT License. You can find the full license details in the LICENSE file.

## Acknowledgments

- This project is built with GraphQL, Prisma, and other open-source technologies.
- Special thanks to the Docker community for making containerization easy.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on this repository. Contributions and pull requests are welcome!

Enjoy using **Social Media Backend** for your GraphQL development and database management needs!

## Additional Information

- The GraphQL server will be accessible at `http://localhost:4000` in your local environment.
- The Prisma Client and database schema are set up for you to interact with the PostgreSQL database. You can modify the schema in the `prisma/schema.prisma` file.
- Creating posts and other features will be soon included into this repo
