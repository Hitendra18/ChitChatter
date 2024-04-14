const errorResponseHandler = (err, _, res, __) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

const invalidPathHandler = (_, __, next) => {
  const error = new Error("Invalid Path...");
  error.statusCode = 404;
  next(error);
};

module.exports = { invalidPathHandler, errorResponseHandler };
