const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const student = require("./routes/student");

require("./model/user");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/app/v1/student',student);

module.exports = app;
