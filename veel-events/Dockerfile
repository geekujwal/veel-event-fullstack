FROM node:alpine

WORKDIR /app

COPY veel-events/package*.json ./

RUN npm install

COPY veel-events/* .

EXPOSE 80

CMD ["npm", "run", "dev"]