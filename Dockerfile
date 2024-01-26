FROM node:20-alpine3.18 AS build

# Install node deps and compile native add-ons
RUN apk add --no-cache \
  build-base \
  gcc \
  g++ \
  make

# Create app dir
RUN mkdir -p /app

# Update working directory
WORKDIR /app

COPY .env .
COPY package.json .
COPY package-lock.json .

RUN npm ci

# Copy project files
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]