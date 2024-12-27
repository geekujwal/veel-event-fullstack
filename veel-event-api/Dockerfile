FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE ${PORT}

CMD ["node", "index.js"]