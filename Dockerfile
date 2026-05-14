# Step 1 - use node 20 as base image
FROM node:20-alpine

# Step 2 - set working directory inside container
WORKDIR /app

# Step 3 - copy package files first
COPY package*.json ./

# Step 4 - install dependencies
RUN npm ci

# Step 5 - copy rest of the code
COPY . .

# Step 6 - build the Next.js app
RUN npm run build

# Step 7 - expose port
EXPOSE 3000

# Step 8 - start the app
CMD ["npm", "start"]