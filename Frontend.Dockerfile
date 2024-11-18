# Use an official Node.js runtime as a base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files into the container
COPY ./Frontend/package*.json ./

# Install Node.js dependencies
RUN npm install

# Install dotenv-cli to load .env file
RUN npm install -g dotenv-cli

# Copy the rest of the application code into the container
COPY ./Frontend .

# Copy the .env file from the parent directory into the container
COPY .env /frontend/.env

# Expose the frontend port (default is 3000)
EXPOSE 3000

# Use dotenv to run the Node.js app with .env loaded
CMD ["node", "server.js"]
