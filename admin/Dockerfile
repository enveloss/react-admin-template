FROM node:19-alpine

WORKDIR /app

COPY build .

RUN npm i --global serve

CMD [ "serve", "-p", "80", "-s" ]