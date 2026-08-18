const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const projectRoutes = require("./routes/projectRoutes");

app.use("/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to DevHub API");
});

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`DevHub API running on port ${PORT}`);
});