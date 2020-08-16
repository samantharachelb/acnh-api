# Use slimmed down image of node:12 to build project
FROM node:12-alpine AS BUILD_IMAGE

# add project build requirements
RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app
COPY package-lock.json ./
COPY --chown=node:node . .

# install and build packages
RUN npm ci

# Build project
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# run node-prune
RUN /usr/local/bin/node-prune

# Build deploy image
FROM node:12-alpine
WORKDIR /usr/src/app
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/"]

