const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

/**
 * @typedef {object} Project
 * @property {integer} id - Project ID
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {object} ProjectInput
 * @property {string} name - Project name
 * @property {string} description - Project description
 */

/**
 * Get all projects
 * @route GET /api/projects
 * @group Projects - Operations about projects
 * @returns {Array.<Project>} 200 - An array of project objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', projectController.getAllProjects);

/**
 * Create a new project
 * @route POST /api/projects
 * @group Projects - Operations about projects
 * @param {ProjectInput.model} project.body.required - Project object that needs to be added
 * @returns {Project.model} 201 - Created project
 * @returns {Error} default - Unexpected error
 */
router.post('/', projectController.createProject);

/**
 * Get a project by ID
 * @route GET /api/projects/{id}
 * @group Projects - Operations about projects
 * @param {integer} id.path.required - Project ID
 * @returns {Project.model} 200 - Project object
 * @returns {Error} 404 - Project not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', projectController.getProjectById);

/**
 * Update a project
 * @route PUT /api/projects/{id}
 * @group Projects - Operations about projects
 * @param {integer} id.path.required - Project ID
 * @param {ProjectInput.model} project.body.required - Project object that needs to be updated
 * @returns {Project.model} 200 - Updated project
 * @returns {Error} 404 - Project not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', projectController.updateProject);

/**
 * Delete a project
 * @route DELETE /api/projects/{id}
 * @group Projects - Operations about projects
 * @param {integer} id.path.required - Project ID
 * @returns {null} 204 - Project deleted successfully
 * @returns {Error} 404 - Project not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', projectController.deleteProject);

module.exports = router;