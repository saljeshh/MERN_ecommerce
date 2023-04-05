const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MonogDB  ID error eg. id on mongo db = 45 it doesnt know it is id or not
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400); // bad request = 400
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
