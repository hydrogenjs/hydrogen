FROM node:12.10.0-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json /app/
COPY ./*.lock /app/
COPY . /app/

RUN yarn install && cd ./docs && yarn install

EXPOSE 8080

WORKDIR /app/docs

CMD ["yarn", "serve:normal"]
