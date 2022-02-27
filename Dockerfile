
# FROM node:12.22.10-alpine as base
# # Create app directory
# WORKDIR /app

# # Install app dependencies
# COPY package*.json ./

# EXPOSE 5000

# FROM base as development
# ENV NODE_ENV=development
# RUN npm install
# COPY . /
# CMD [ "node", "index.js" ]


# FROM base as production
# ENV NODE_ENV=production
# RUN npm install
# COPY . /q
# CMD [ "node", "index.js" ]



FROM node:12.22.10-alpine as base
ARG ENV
# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

EXPOSE 5000
RUN npm install
COPY . /
RUN if [  $ENV= sandbox ] ; then npm run dev ; else npm run prod ; fi
