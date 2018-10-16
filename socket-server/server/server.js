const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const SocketService = require("./services/socket.service.js");
const PORT = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);
const io = new SocketService(server);

io.initialize();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/notifications").post(postNotificationHandler);

server.listen(PORT, err => {
  if (err) return console.log(err);

  return console.log(`Listening on port ${PORT}`);
});

async function postNotificationHandler(req, res) {
  try {
    console.log(req);
    const { clientID, taskID } = req.body;
    let validPost = clientID && taskID;
    if (validPost) await io.emitResult(clientID, taskID);

    return res.sendStatus(validPost ? 202 : 400);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
}

if (process.env.NODE_ENV === "test") module.exports = () => server;
