FROM node:7.1.0

WORKDIR /usr/src/app/

COPY articles/           /usr/src/app/articles/
COPY scripts/            /usr/src/app/scripts/
COPY src/                /usr/src/app/src/
COPY package.json        /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/

RUN npm install

EXPOSE 8000

CMD [ "node", "src/server/index.js" ]
