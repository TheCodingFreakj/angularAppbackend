# FROM node:16

# # Create app directory
# WORKDIR /app

# # Install app dependencies
# COPY package*.json ./

# RUN npm install

# # Copying rest of the application to app directory
# COPY . /app

# # Expose the port and start the application
# EXPOSE 5000
# ARG DOCKER_ENV
# ENV NODE_ENV=${DOCKER_ENV}
# CMD [ "node", "index.js" ]

FROM node:12.22.10-alpine as base
# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

EXPOSE 5000

FROM base as development
ENV NODE_ENV=development
RUN npm install
COPY . /
CMD [ "node", "index.js" ]


FROM base as production
ENV NODE_ENV=production
RUN npm install
COPY . /q
CMD [ "node", "index.js" ]