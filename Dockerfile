# build from node and nginx
FROM node:12

# set working directory
WORKDIR /usr/src/app

# copy package files
COPY package*.json ./

# build packages for peoduction
RUN npm ci --only=production
RUN npm i -g pm2

# copy the rest of the project over
COPY  --chown=node:node . .
EXPOSE 3000
CMD ["npm", "run", "build"]
CMD ["node", "dist/index.js"]
