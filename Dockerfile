FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /usr/src/app

ADD ./package.json ./
ADD ./package-lock.json ./

RUN npm install