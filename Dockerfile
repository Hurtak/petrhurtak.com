FROM node:7.1.0

# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

# Bundle app source
COPY articles            /usr/src/app/articles/
COPY scripts/            /usr/src/app/scripts/
COPY src/                /usr/src/app/src/
COPY package.json        /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/

# Install app dependencies
RUN npm install

# Start the app
EXPOSE 8000
CMD [ "node", "src/server/index.js" ]
