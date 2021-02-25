const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);

app.get('/', (req, res) =>
  res.send('Server is still running, but route not found'),
);

server.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}`),
);
