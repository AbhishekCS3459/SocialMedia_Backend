FROM alpine
RUN apk add --update nodejs npm

# Set the working directory in the container
WORKDIR /app

# Install Yarn (if not already installed)
RUN npm install -g yarn

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build your application
RUN yarn build

# Install additional packages (e.g., openssl)
RUN apt-get update -y && apt-get install -y openssl

# Generate Prisma client
RUN npx prisma generate

# Expose a port (if your application listens on a specific port)
EXPOSE 8000

# Define the command to run your Node.js application using an entry point script
CMD ["sh", "-c", "npm run start:production"]
