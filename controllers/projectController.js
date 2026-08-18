const projects = require("../data/projects");
const AppError = require("../middleware/AppError");

const getProjects = (req, res) => {
    res.json(projects);
};

const getProject = (req, res) => {
    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    res.json(project);
};

const createProject = (req, res) => {
    const { name, status } = req.body;

    const newProject = {
        id: projects.length + 1,
        name: name,
        status: status
    };

    projects.push(newProject);

    res.status(201).json(newProject);
};

const updateProject = (req, res) => {
    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    const { name, status } = req.body;

    project.name = name;
    project.status = status;

    res.json(project);
};

const updateProjectPartially = (req, res) => {
    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    const { name, status } = req.body;

    if (name !== undefined) {
        if (!name) {
            return res.status(400).json({
                message: "Name cannot be empty"
            });
        }

        project.name = name;
    }

    if (status !== undefined) {
        if (status !== "active" && status !== "completed") {
            return res.status(400).json({
                message: "Status must be active or completed"
            });
        }

        project.status = status;
    }

    res.json(project);
};

const deleteProject = (req,res)=>{
    const id = Number(req.params.id);
    const projectIndex = projects.findIndex(p => p.id == id);
    if(projectIndex === -1){
        return res.status(404).json({
            message : "Project not found"
        })
    }
    const deletedProject = project.splice(projectIndex, 1);
    res.json({
        message : "Project deleted successfully",
        project : deleteProject[0]
    })
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    updateProjectPartially,
    deleteProject
};