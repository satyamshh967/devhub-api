const express = require("express");

const router = express.Router();

const validateProject = require("../middleware/projectValidation");
const validateProjectQuery = require("../middleware/projectQueryValidation");
const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");

const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    updateProjectPartially,
    deleteProject
} = require("../controllers/projectController");


/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get the authenticated user's projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of projects per page
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - active
 *             - completed
 *         description: Filter projects by status
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search projects by name
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-createdAt"
 *         description: Sort projects
 *
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get(
    "/",
    validateProjectQuery,
    authMiddleware,
    asyncHandler(getProjects)
);


/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project MongoDB ID
 *
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Project not found
 */
router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getProject)
);


/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: AI Study Companion
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - completed
 *                 example: active
 *
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid project data
 *       401:
 *         description: Authentication required
 */
router.post(
    "/",
    authMiddleware,
    validateProject,
    asyncHandler(createProject)
);


/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Completely update a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project MongoDB ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: AI Study Companion Pro
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - completed
 *                 example: completed
 *
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid project data
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Project not found
 */
router.put(
    "/:id",
    authMiddleware,
    validateProject,
    asyncHandler(updateProject)
);


/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Partially update a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project MongoDB ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: AI Study Companion V2
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - completed
 *
 *     responses:
 *       200:
 *         description: Project partially updated successfully
 *       400:
 *         description: Invalid project data
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Project not found
 */
router.patch(
    "/:id",
    authMiddleware,
    asyncHandler(updateProjectPartially)
);


/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project MongoDB ID
 *
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Project not found
 */
router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(deleteProject)
);


module.exports = router;