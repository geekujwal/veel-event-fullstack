FROM node:alpine

WORKDIR /app

COPY veel-events/package*.json ./

RUN npm install

COPY veel-events/* .

EXPOSE 5173

CMD ["npm", "run", "dev"]