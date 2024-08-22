FROM node:20-alpine

WORKDIR /home/node/app

RUN apk update && apk upgrade && apk add --no-cache bash

COPY ../package.json ../tsconfig.json ../package-lock.json ../.env ./
COPY ../prisma prisma/

RUN npm install

COPY ../src src/

ENTRYPOINT [ "/home/node/app/src/config/entrypoint.sh" ]
