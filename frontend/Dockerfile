# Use an official Node runtime as a parent image
FROM node:14-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
