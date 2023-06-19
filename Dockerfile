FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "node", "index.js" ]