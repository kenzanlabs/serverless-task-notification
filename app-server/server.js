const express = require('express');
const http = require('http');

const SocketService = require('./services/socket.service.js')

const app = express();
const server = http.createServer(app);
const io =  new SocketService(server);

const PORT = process.env.PORT || 9000;

io.initialize();

app.use("/notifications", notificationHandler);

server.listen(PORT, (err) => {
  if(err) return console.log(err);

  return console.log(`Listening on port ${PORT}`)
});

async function notificationHandler(req, res) {
  // remove async if not needed down the road
  const response = await 'Connected';

  res.send(response);
}
