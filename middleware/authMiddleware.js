const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new AppError("Authentication required", 401);
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        );

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new AppError("Token has expired", 401);
        }

        if (error.name === "JsonWebTokenError") {
            throw new AppError("Invalid token", 401);
        }

        throw new AppError("Authentication failed", 401);
    }
};

module.exports = authMiddleware;