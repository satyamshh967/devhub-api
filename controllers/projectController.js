const AppError = require("../middleware/AppError");
const Project = require("../models/Project");

const getProjects = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        status,
        search,
        sort = "-createdAt"
    } = req.query;

    const query = {
        user: req.user.userId
    };

    if (status) {
        query.status = status;
    }

    if (search) {
        query.name = {
            $regex: search,
            $options: "i"
        };
    }

    const skip = (page - 1) * limit;

    const projects = await Project
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

    const total = await Project.countDocuments(query);

    res.json({
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
        projects
    });
};

const getProject = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        user: req.user.userId
    });

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    res.json(project);
};

const createProject = async (req, res) => {
    const { name, status } = req.body;

    const newProject = await Project.create({
        name,
        status,
        user: req.user.userId
    });

    res.status(201).json(newProject);
};

const updateProject = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        user: req.user.userId
    });

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    const { name, status } = req.body;

    project.name = name;
    project.status = status;

    await project.save();

    res.json(project);
};

const updateProjectPartially = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        user: req.user.userId
    });

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    const { name, status } = req.body;

    if (name !== undefined) {
        if (!name) {
            throw new AppError("Name cannot be empty", 400);
        }

        project.name = name;
    }

    if (status !== undefined) {
        if (status !== "active" && status !== "completed") {
            throw new AppError(
                "Status must be active or completed",
                400
            );
        }

        project.status = status;
    }

    await project.save();

    res.json(project);
};

const deleteProject = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        user: req.user.userId
    });

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    await Project.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId
    });

    res.json({
        message: "Project deleted successfully",
        project
    });
};

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    updateProjectPartially,
    deleteProject
};