const AppError = require("./AppError");

const validateProjectQuery = (req, res, next) => {
    const { page, limit, status } = req.query;

    if (page !== undefined) {
        const pageNumber = Number(page);

        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1
        ) {
            throw new AppError(
                "Page must be a positive integer",
                400
            );
        }

        req.query.page = pageNumber;
    }

    if (limit !== undefined) {
        const limitNumber = Number(limit);

        if (
            !Number.isInteger(limitNumber) ||
            limitNumber < 1 ||
            limitNumber > 100
        ) {
            throw new AppError(
                "Limit must be between 1 and 100",
                400
            );
        }

        req.query.limit = limitNumber;
    }

    if (status !== undefined) {
        if (typeof status !== "string") {
            throw new AppError(
                "Status must be a string",
                400
            );
        }

        const normalizedStatus = status.trim().toLowerCase();

        if (
            normalizedStatus !== "active" &&
            normalizedStatus !== "completed"
        ) {
            throw new AppError(
                "Status must be active or completed",
                400
            );
        }

        req.query.status = normalizedStatus;
    }

    next();
};

module.exports = validateProjectQuery;