require("dotenv").config();

const connectDB = require("./config/db");
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to DevHub API");
});

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
    console.log(`DevHub API running on port ${PORT}`);
});