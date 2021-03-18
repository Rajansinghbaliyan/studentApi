const mongoose = require("mongoose");

const DB = process.env.DATABASE;
mongoose.connect(
  DB,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to the Database ...");
  }
);


