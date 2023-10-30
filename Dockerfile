# Use an official Node.js runtime as a parent image
FROM node:20.9.0-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

RUN yarn build

RUN apt-get update -y && apt-get install -y openssl
RUN npx prisma generate

# Expose a port (if your application listens on a specific port)
EXPOSE 8000
# Define the command to run your Node.js application using an entry point script
CMD ["sh", "-c","npm run start:production"]