FROM node:7.1.0

# Create app directory
RUN mkdir -p /usr/src/blog
RUN mkdir -p /usr/src/blog/app
RUN mkdir -p /usr/src/blog/articles
WORKDIR /usr/src/blog/app

# Bundle app source
COPY scripts/            /usr/src/blog/app/scripts/
COPY src/                /usr/src/blog/app/src/
COPY package.json        /usr/src/blog/app/
COPY npm-shrinkwrap.json /usr/src/blog/app/
COPY articles            /usr/src/blog/articles/

# Install app dependencies
RUN npm install

# Start the app
EXPOSE 8000
CMD [ "node", "src/server/index.js" ]
