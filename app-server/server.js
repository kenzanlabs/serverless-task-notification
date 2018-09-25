const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 9000;

app.use("/", (req, res) => {
  res.send("Connected!");
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
