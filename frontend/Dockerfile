# Use an official Node.js runtime as a parent image
FROM node:20-bullseye

# Set environment variables
ENV NODE_ENV development

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json /app/
RUN npm install

# Copy the current directory contents into the container at /app
COPY . /app/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the command to start the React dev server
CMD ["npm", "start"]
