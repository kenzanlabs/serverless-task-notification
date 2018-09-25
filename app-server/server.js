const express = require('express');
const http = require('http');

const socketIO = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketIO(server)

const PORT = process.env.PORT || 9000;

async function notificationHandler(req, res) {
  const response = await 'Connected';

  res.send(response);
}

io.on('connection', socket => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});

app.use("/notifications", notificationHandler);

server.listen(PORT, (err) => {
  if(err) return console.log(err);

  return console.log(`Listening on port ${PORT}`)
});
