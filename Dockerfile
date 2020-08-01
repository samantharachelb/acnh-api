# build from node and nginx
FROM node:14

# set working directory
WORKDIR /usr/src/app

# copy package files
COPY package*.json ./

# build packages for peoduction
RUN npm ci --only=production

# copy the rest of the project over
COPY  --chown=node:node . .
EXPOSE 3000
CMD ["npm", "run", "serve"]
