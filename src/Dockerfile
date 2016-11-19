FROM node:7.1.0

WORKDIR /usr/src/app/

RUN mkdir -pv /usr/src/app/src/www/log/app-message
RUN mkdir -pv /usr/src/app/src/www/log/exceptions
RUN mkdir -pv /usr/src/app/src/www/articles

COPY articles/           /usr/src/app/articles/
COPY scripts/            /usr/src/app/scripts/
COPY src/                /usr/src/app/src/
COPY package.json        /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/

RUN npm install

EXPOSE 8000

CMD [ "node", "src/server/index.js" ]
