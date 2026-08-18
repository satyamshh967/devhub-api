const validateProject = (req, res, next) => {
    const { name, status } = req.body;

    if (!name || !status) {
        return res.status(400).json({
            message: "Name and status are required"
        });
    }

    if (status !== "active" && status !== "completed") {
        return res.status(400).json({
            message: "Status must be active or completed"
        });
    }

    next();
};

module.exports = validateProject;