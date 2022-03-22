FROM node:17-alpine

WORKDIR /app
COPY package.json /app/
RUN yarn
COPY . /app/
RUN yarn build

CMD [ "yarn", "start" ]