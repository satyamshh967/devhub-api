const Project = require("../models/Project");
// const projects = require("../data/projects");
const AppError = require("../middleware/AppError");

const getProjects = (req, res) => {
    res.json(projects);
};

const getProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    res.json(project);
};

const createProject = async (req, res) => {
    const { name, status } = req.body;

    const newProject = await Project.create({
        name, status
    })

    res.status(201).json(newProject);
};

const updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

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
    const project = await Project.findById(req.params.id);

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
    const project = await Project.findById(req.params.id);

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    await Project.findByIdAndDelete(req.params.id);

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