import express from 'express';
const router = express.Router();
import { getAllChats, createChat, getChatById, updateChat, deleteChat } from '../controllers/chatController.js';

/**
 * @typedef Chat
 * @property {integer} id.required - Chat ID
 * @property {string} content.required - Chat content
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef ChatInput
 * @property {string} content.required - Chat content
 */

/**
 * Get all chats
 * @route GET /chats
 * @group Chats - Operations about chats
 * @returns {Array.<Chat>} 200 - An array of chat objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', getAllChats);

/**
 * Create a new chat
 * @route POST /chats
 * @group Chats - Operations about chats
 * @param {ChatInput.model} chat.body.required - Chat object that needs to be added
 * @returns {Chat.model} 201 - Created chat
 * @returns {Error} default - Unexpected error
 */
router.post('/', createChat);

/**
 * Get a chat by ID
 * @route GET /chats/{id}
 * @group Chats - Operations about chats
 * @param {integer} id.path.required - Chat ID
 * @returns {Chat.model} 200 - Chat object
 * @returns {Error} 404 - Chat not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', getChatById);

/**
 * Update a chat
 * @route PUT /chats/{id}
 * @group Chats - Operations about chats
 * @param {integer} id.path.required - Chat ID
 * @param {ChatInput.model} chat.body.required - Chat object that needs to be updated
 * @returns {Chat.model} 200 - Updated chat
 * @returns {Error} 404 - Chat not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', updateChat);

/**
 * Delete a chat
 * @route DELETE /chats/{id}
 * @group Chats - Operations about chats
 * @param {integer} id.path.required - Chat ID
 * @returns {object} 204 - Chat deleted successfully
 * @returns {Error} 404 - Chat not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', deleteChat);

export default router;