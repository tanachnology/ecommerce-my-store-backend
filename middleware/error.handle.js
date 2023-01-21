function logError(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode).json(payload);
  } else {
    next(err);
  }
}

module.exports = {logError, errorHandler, boomErrorHandler};
