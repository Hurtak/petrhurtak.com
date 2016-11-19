FROM nginx:1.11.5

WORKDIR /usr/src/app/

COPY src/static /usr/share/nginx/html

EXPOSE 8000

CMD [ "node", "src/server/index.js" ]
