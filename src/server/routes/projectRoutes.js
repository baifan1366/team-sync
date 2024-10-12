import express from 'express';
const router = express.Router();
import { getAllProjects, createProject, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';

/**
 * @typedef Project
 * @property {integer} id.required - Project ID
 * @property {string} name.required - Project name
 * @property {string} description - Project description
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef ProjectInput
 * @property {string} name.required - Project name
 * @property {string} description - Project description
 */

/**
 * Get all projects
 * @route GET /projects
 * @group Projects - Operations about projects
 * @returns {Array.<Project>} 200 - An array of project objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', getAllProjects);

/**
 * Create a new project
 * @route POST /projects
 * @group Projects - Operations about projects
 * @param {ProjectInput.model} project.body.required - Project object that needs to be added
 * @returns {Project.model} 201 - Created project
 * @returns {Error} default - Unexpected error
 */
router.post('/', createProject);

/**
 * Get a project by ID
 * @route GET /projects/{id}
 * @group Projects - Operations about projects
 * @param {integer} id.path.required - Project ID
 * @returns {Project.model} 200 - Project object
 * @returns {Error} 404 - Project not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', getProjectById);

/**
 * Update a project
 * @route PUT /projects/{id}
 * @group Projects - Operations about projects
 * @param {integer} id.path.required - Project ID
 * @param {ProjectInput.model} project.body.required - Project object that needs to be updated
 * @returns {Project.model} 200 - Updated project
 * @returns {Error} 404 - Project not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', updateProject);

/**
 * Delete a project
 * @route DELETE /projects/{id}
 * @group Projects - Operations about projects
 * @param {integer} id.path.required - Project ID
 * @returns {object} 204 - Project deleted successfully
 * @returns {Error} 404 - Project not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', deleteProject);

export default router;