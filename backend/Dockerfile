FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
COPY wait-for-it.sh .

EXPOSE 4000 2222 

CMD ["yarn", "server"]
