FROM node:8-slim

# File Author / Maintainer
LABEL authors="Renish Bhaskaran"

# Change directory so that our commands run inside this new dir
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json /usr/src/app/
# Install app dependencies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# set your port
ENV PORT 8080
ENV envName=prod

# expose the port to outside world
EXPOSE  8080

# start command as per package.json
CMD ["npm", "start"]
