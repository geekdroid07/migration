ARG NODE_VERSION=18.16.0
ARG ALPINE_VERSION=3.17

# STAGE 1
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as builder
RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package.json ./
# RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node

USER node

RUN npm install
COPY --chown=node:node . .

RUN npm run build-ts


# STAGE 2
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}
RUN mkdir -p /app/node_modules && chown -R node:node /app

# RUN chown -Rh node:node /app/build

WORKDIR /app
COPY --chown=node:node package.json ./

USER node

RUN npm install 
COPY --chown=node:node --from=builder /app/build ./build



EXPOSE 8080

CMD [ "node", "build/server.js" ]
