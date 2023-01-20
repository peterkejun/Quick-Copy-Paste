FROM node:18-alpine AS base

WORKDIR /app

CMD ["sh"]

FROM base AS dev

RUN apk update && apk upgrade && apk add bash

CMD ["yarn", "start"]
