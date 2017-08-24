# Defining the latest node image we want to build from
FROM node:argon
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
# Exposing port 8080
EXPOSE 3000
# Start the app.
CMD NODE_ENV=$environment node ./bin/www
