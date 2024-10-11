const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @typedef {object} User
 * @property {integer} id - User ID
 * @property {string} username - Username
 * @property {string} email - User's email
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {object} UserInput
 * @property {string} username - Username
 * @property {string} email - User's email
 * @property {string} password - User's password
 */

/**
 * Get all users
 * @route GET /api/users
 * @group Users - Operations about users
 * @returns {Array.<User>} 200 - An array of user objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', userController.getAllUsers);

/**
 * Create a new user
 * @route POST /api/users
 * @group Users - Operations about users
 * @param {UserInput.model} user.body.required - User object that needs to be added
 * @returns {User.model} 201 - Created user
 * @returns {Error} default - Unexpected error
 */
router.post('/', userController.createUser);

/**
 * Get a user by ID
 * @route GET /api/users/{id}
 * @group Users - Operations about users
 * @param {integer} id.path.required - User ID
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', userController.getUserById);

/**
 * Update a user
 * @route PUT /api/users/{id}
 * @group Users - Operations about users
 * @param {integer} id.path.required - User ID
 * @param {UserInput.model} user.body.required - User object that needs to be updated
 * @returns {User.model} 200 - Updated user
 * @returns {Error} 404 - User not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', userController.updateUser);

/**
 * Delete a user
 * @route DELETE /api/users/{id}
 * @group Users - Operations about users
 * @param {integer} id.path.required - User ID
 * @returns {null} 204 - User deleted successfully
 * @returns {Error} 404 - User not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;