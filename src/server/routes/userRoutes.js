import express from 'express';
const router = express.Router();
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

/**
 * @typedef User
 * @property {integer} id.required - User ID
 * @property {string} username.required - Username
 * @property {string} email.required - User's email
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef UserInput
 * @property {string} username.required - Username
 * @property {string} email.required - User's email
 * @property {string} password.required - User's password
 */

/**
 * Get all users
 * @route GET /users
 * @group Users - Operations about users
 * @returns {Array.<User>} 200 - An array of user objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', getAllUsers);

/**
 * Create a new user
 * @route POST /users
 * @group Users - Operations about users
 * @param {UserInput.model} user.body.required - User object that needs to be added
 * @returns {User.model} 201 - Created user
 * @returns {Error} default - Unexpected error
 */
router.post('/', createUser);

/**
 * Get a user by ID
 * @route GET /users/{id}
 * @group Users - Operations about users
 * @param {integer} id.path.required - User ID
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', getUserById);

/**
 * Update a user
 * @route PUT /users/{id}
 * @group Users - Operations about users
 * @param {integer} id.path.required - User ID
 * @param {UserInput.model} user.body.required - User object that needs to be updated
 * @returns {User.model} 200 - Updated user
 * @returns {Error} 404 - User not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', updateUser);

/**
 * Delete a user
 * @route DELETE /users/{id}
 * @group Users - Operations about users
 * @param {integer} id.path.required - User ID
 * @returns {object} 204 - User deleted successfully
 * @returns {Error} 404 - User not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', deleteUser);

export default router;