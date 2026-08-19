const validateProject = (req, res, next) => {
    const { name, status } = req.body;

    if (name === undefined || status === undefined) {
        return res.status(400).json({
            message: "Name and status are required"
        });
    }

    if (typeof name !== "string" || typeof status !== "string") {
        return res.status(400).json({
            message: "Name and status must be strings"
        });
    }

    const trimmedName = name.trim();
    const trimmedStatus = status.trim().toLowerCase();

    if (!trimmedName) {
        return res.status(400).json({
            message: "Name cannot be empty"
        });
    }

    if (trimmedName.length > 100) {
        return res.status(400).json({
            message: "Name cannot exceed 100 characters"
        });
    }

    if (trimmedStatus !== "active" && trimmedStatus !== "completed") {
        return res.status(400).json({
            message: "Status must be active or completed"
        });
    }

    req.body.name = trimmedName;
    req.body.status = trimmedStatus;

    next();
};

module.exports = validateProject;