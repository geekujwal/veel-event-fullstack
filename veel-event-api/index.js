const express = require('express')
const { connectDb } = require("./utils/db")
const app = express()
require('dotenv').config();

const port = 3000
const server = require('http').createServer(app);

const io = require('socket.io')(server,
  {
    cors: {
      origin: "*",
    }
  }
);

app.set('io', io);

app.use(express.json({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

const userController = require('./controllers/userController');
const playerController = require('./controllers/playerController');
const matchController = require('./controllers/matchController');

app.use('/api/v1/user', userController);
app.use('/api/v1/player', playerController);
app.use('/api/v1/match', matchController);

server.listen(port, () => {
  connectDb();
  console.log(`Example app listening on port ${port}`)
})