FROM node:alpine

WORKDIR /app

COPY veel-events/package*.json ./

RUN npm install

COPY veel-events/* .

COPY veel-events/.env .env

EXPOSE 80

CMD ["npm", "run", "dev"]