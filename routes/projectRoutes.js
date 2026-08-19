const express = require("express");

const router = express.Router();

const validateProject = require("../middleware/projectValidation");
const validateProjectQuery = require("../middleware/projectQueryValidation");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  updateProjectPartially,
  deleteProject,
} = require("../controllers/projectController");

router.get("/", authMiddleware, asyncHandler(getProjects));

router.get("/:id", authMiddleware, asyncHandler(getProject));

router.put("/:id", authMiddleware, validateProject, asyncHandler(updateProject));

router.patch("/:id", authMiddleware, asyncHandler(updateProjectPartially));

router.post("/", authMiddleware, validateProject, asyncHandler(createProject));

router.delete("/:id", authMiddleware, asyncHandler(deleteProject));

module.exports = router;
