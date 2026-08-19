const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err.message || err);

    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0];
        message = `${field || "Field"} already exists`;
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;