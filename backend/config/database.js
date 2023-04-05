const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Monogo DB connected with server: ${data.connection.host}`);
    });
  // no need catch because we handled unhandled promise rejection in server
  // .catch((err) => {
  //   console.log(err);
  // });
};

module.exports = connectDatabase;
