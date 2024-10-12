import express from 'express';
const router = express.Router();
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';

/**
 * @typedef Task
 * @property {integer} id.required - Task ID
 * @property {string} title.required - Task title
 * @property {string} description - Task description
 * @property {string} status.required - Task status
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef TaskInput
 * @property {string} title.required - Task title
 * @property {string} description - Task description
 * @property {string} status.required - Task status
 */

/**
 * Get all tasks
 * @route GET /tasks
 * @group Tasks - Operations about tasks
 * @returns {Array.<Task>} 200 - An array of task objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', getAllTasks);

/**
 * Create a new task
 * @route POST /tasks
 * @group Tasks - Operations about tasks
 * @param {TaskInput.model} task.body.required - Task object that needs to be added
 * @returns {Task.model} 201 - Created task
 * @returns {Error} default - Unexpected error
 */
router.post('/', createTask);

/**
 * Get a task by ID
 * @route GET /tasks/{id}
 * @group Tasks - Operations about tasks
 * @param {integer} id.path.required - Task ID
 * @returns {Task.model} 200 - Task object
 * @returns {Error} 404 - Task not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', getTaskById);

/**
 * Update a task
 * @route PUT /tasks/{id}
 * @group Tasks - Operations about tasks
 * @param {integer} id.path.required - Task ID
 * @param {TaskInput.model} task.body.required - Task object that needs to be updated
 * @returns {Task.model} 200 - Updated task
 * @returns {Error} 404 - Task not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', updateTask);

/**
 * Delete a task
 * @route DELETE /tasks/{id}
 * @group Tasks - Operations about tasks
 * @param {integer} id.path.required - Task ID
 * @returns {object} 204 - Task deleted successfully
 * @returns {Error} 404 - Task not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', deleteTask);

export default router;