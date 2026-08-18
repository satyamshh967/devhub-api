const express = require("express");
const router = express.Router();
const validateProject = require("../middleware/projectValidation");

const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    updateProjectPartially,
    deleteProject
} = require("../controllers/projectController");

router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", validateProject, updateProject);
router.patch("/:id", updateProjectPartially);
router.post("/", validateProject, createProject);
router.delete("/:id", deleteProject);

module.exports = router;