# Use a Node.js base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY ./src/clinet .

# Install dependencies
RUN npm install

# Build the application (optional, but recommended for production)
# RUN npm run build

# Command to run your application.
CMD ["npm", "run", "start"]
# CMD ["tail", "-f", "/dev/null"]