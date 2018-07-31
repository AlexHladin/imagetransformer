FROM node:10

ADD . /usr/app
WORKDIR /usr/app

COPY package.json .
RUN npm install

EXPOSE 3000
