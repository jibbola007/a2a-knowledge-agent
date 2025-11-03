# Dockerfile
FROM node:18-alpine

# create app directory
WORKDIR /app

# copy dependency files first (for build cache)
COPY package*.json ./

# install only production dependencies
RUN npm install --omit=dev

# copy rest of the project files
COPY . .

# expose the port your app uses
EXPOSE 3333

# run the app
CMD ["npm", "start"]
