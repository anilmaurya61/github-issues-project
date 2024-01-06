function errorHandler(err, req, res, next) {
    console.error('Error:', err);

    let statusCode = 500;

    if (err.status) {
        statusCode = err.status;
    }

    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
}

module.exports = errorHandler;