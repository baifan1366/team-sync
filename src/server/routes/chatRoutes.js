const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

/**
 * @typedef {object} Chat
 * @property {integer} id - Chat ID
 * @property {string} content - Chat content
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {object} ChatInput
 * @property {string} content - Chat content
 */

/**
 * Get all chats
 * @route GET /api/chats
 * @group Chats - Operations about chats
 * @returns {Array.<Chat>} 200 - An array of chat objects
 * @returns {Error}  default - Unexpected error
 */
router.get('/', chatController.getAllChats);

/**
 * Create a new chat
 * @route POST /api/chats
 * @group Chats - Operations about chats
 * @param {ChatInput.model} chat.body.required - Chat object that needs to be added
 * @returns {Chat.model} 201 - Created chat
 * @returns {Error}  default - Unexpected error
 */
router.post('/', chatController.createChat);

/**
 * Get a chat by ID
 * @route GET /api/chats/{id}
 * @group Chats - Operations about chats
 * @param {integer} id.path.required - Chat ID
 * @returns {Chat.model} 200 - Chat object
 * @returns {Error} 404 - Chat not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', chatController.getChatById);

/**
 * Update a chat
 * @route PUT /api/chats/{id}
 * @group Chats - Operations about chats
 * @param {integer} id.path.required - Chat ID
 * @param {ChatInput.model} chat.body.required - Chat object that needs to be updated
 * @returns {Chat.model} 200 - Updated chat
 * @returns {Error} 404 - Chat not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', chatController.updateChat);

/**
 * Delete a chat
 * @route DELETE /api/chats/{id}
 * @group Chats - Operations about chats
 * @param {integer} id.path.required - Chat ID
 * @returns {null} 204 - Chat deleted successfully
 * @returns {Error} 404 - Chat not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', chatController.deleteChat);

module.exports = router;