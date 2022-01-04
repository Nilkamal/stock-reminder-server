const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(morgan("combined"));

module.exports = {
  app,
};
