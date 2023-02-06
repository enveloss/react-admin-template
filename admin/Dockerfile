FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm i --global serve
RUN npm i  --force
RUN npm run build

WORKDIR /app/dist

CMD [ "serve", "-p", "80", "-s" ]