# Use an official Node.js runtime as a parent image
FROM node:slim
ENV NODE_ENV=production
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

RUN yarn build


# Set environment variables
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"


# Expose a port (if your application listens on a specific port)
EXPOSE 8000
# Define the command to run your Node.js application using an entry point script
CMD ["sh", "-c","npm run start:production"]