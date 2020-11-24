FROM node:14.15.1-alpine3.10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]

#https://hub.docker.com/_/node  for first line node image, i use node v14.15.0 local

#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

#using Docker Desktop Service

#docker build -t yinglu91/proshop-backend:1.0 -f Dockerfile .
#docker images
#docker run -p 49160:5000 -d yinglu91/proshop-backend:1.0
#docker ps
#curl -i localhost:49160

#docker logs <container id>
#docker exec -it <container id> /bin/bash


