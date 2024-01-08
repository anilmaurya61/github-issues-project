function errorHandler(err, req, res, next) {

    let statusCode = 500;

    if (err.status) {
        statusCode = err.status;
    }

    res.status(statusCode).send(
        err.message || 'Internal Server Error',
    );
}

module.exports = errorHandler;