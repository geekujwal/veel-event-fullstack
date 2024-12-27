FROM node:alpine

WORKDIR /app

COPY veel-event-api/package*.json ./

RUN npm install

COPY veel-event-api/. .


EXPOSE 3000

CMD ["node", "index.js"]