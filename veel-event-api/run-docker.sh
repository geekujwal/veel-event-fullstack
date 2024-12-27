#!/bin/bash

export $(grep -v '^#' .env | xargs)

docker run -d --name veel-event-server -p 3000:3000 -e port=3000 -e db="mongodb+srv://teleph0nes:wj48Xaal86C9XWvX@veel-event-db.h8f50.mongodb.net/?retryWrites=true&w=majority&appName=veel-event-db" veel-event-server
