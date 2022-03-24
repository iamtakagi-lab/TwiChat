FROM node:17

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app
COPY package.json /app/
RUN yarn
COPY . /app/
RUN yarn build

CMD [ "yarn", "start" ]