FROM node:alpine AS BUILDER
WORKDIR /app

COPY . .
RUN yarn install
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start"]