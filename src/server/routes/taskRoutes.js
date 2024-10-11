const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @typedef {object} Task
 * @property {integer} id - Task ID
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {string} status - Task status
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {object} TaskInput
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {string} status - Task status
 */

/**
 * Get all tasks
 * @route GET /api/tasks
 * @group Tasks - Operations about tasks
 * @returns {Array.<Task>} 200 - An array of task objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', taskController.getAllTasks);

/**
 * Create a new task
 * @route POST /api/tasks
 * @group Tasks - Operations about tasks
 * @param {TaskInput.model} task.body.required - Task object that needs to be added
 * @returns {Task.model} 201 - Created task
 * @returns {Error} default - Unexpected error
 */
router.post('/', taskController.createTask);

/**
 * Get a task by ID
 * @route GET /api/tasks/{id}
 * @group Tasks - Operations about tasks
 * @param {integer} id.path.required - Task ID
 * @returns {Task.model} 200 - Task object
 * @returns {Error} 404 - Task not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', taskController.getTaskById);

/**
 * Update a task
 * @route PUT /api/tasks/{id}
 * @group Tasks - Operations about tasks
 * @param {integer} id.path.required - Task ID
 * @param {TaskInput.model} task.body.required - Task object that needs to be updated
 * @returns {Task.model} 200 - Updated task
 * @returns {Error} 404 - Task not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', taskController.updateTask);

/**
 * Delete a task
 * @route DELETE /api/tasks/{id}
 * @group Tasks - Operations about tasks
 * @param {integer} id.path.required - Task ID
 * @returns {null} 204 - Task deleted successfully
 * @returns {Error} 404 - Task not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;