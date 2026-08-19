require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(helmet());
app.use(cors());

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too many requests, please try again later."
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: "Too many authentication attempts, please try again later."
    }
});

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/auth", authLimiter, authRoutes);

app.use("/projects", generalLimiter, projectRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to DevHub API");
});

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

module.exports = app;