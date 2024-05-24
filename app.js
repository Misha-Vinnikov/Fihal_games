const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const connectToDatabase = require('./database/connect');
const cors = require("./middlewars/cors.js");
const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;

connectToDatabase();

app. use(
  cors,
  bodyParser. json(),
  express.static(path.join(__dirname, 'public')),
  apiRouter
);

app.listen(PORT);
