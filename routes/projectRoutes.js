const express = require("express");

const router = express.Router();

const validateProject = require("../middleware/projectValidation");
const validateProjectQuery = require("../middleware/projectQueryValidation");
const asyncHandler = require("../middleware/asyncHandler");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  updateProjectPartially,
  deleteProject,
} = require("../controllers/projectController");

router.get("/", validateProjectQuery, asyncHandler(getProjects));

router.get("/:id", asyncHandler(getProject));

router.put("/:id", validateProject, asyncHandler(updateProject));

router.patch("/:id", asyncHandler(updateProjectPartially));

router.post("/", validateProject, asyncHandler(createProject));

router.delete("/:id", asyncHandler(deleteProject));

module.exports = router;
