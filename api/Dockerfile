FROM node:18-alpine AS base

WORKDIR /api

CMD ["sh"]

FROM base AS dev

RUN apk update && apk upgrade && apk add bash

RUN npm i -g @nestjs/cli

CMD ["yarn", "start:dev"]
