import express from 'express';
const router = express.Router();
import { getAllTeams, createTeam, getTeamById, updateTeam, deleteTeam, addUserToTeam, removeUserFromTeam } from '../controllers/teamController.js';

/**
 * @typedef Team
 * @property {integer} id.required - Team ID
 * @property {string} teamName.required - Team name
 * @property {integer} productOwnerUserId - Product Owner User ID
 * @property {integer} projectManagerUserId - Project Manager User ID
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef TeamInput
 * @property {string} teamName.required - Team name
 * @property {integer} productOwnerUserId - Product Owner User ID
 * @property {integer} projectManagerUserId - Project Manager User ID
 */

/**
 * @typedef UserTeamOperation
 * @property {integer} userId.required - User ID to add or remove from the team
 */

/**
 * Get all teams
 * @route GET /teams
 * @group Teams - Operations about teams
 * @returns {Array.<Team>} 200 - An array of team objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', getAllTeams);

/**
 * Create a new team
 * @route POST /teams
 * @group Teams - Operations about teams
 * @param {TeamInput.model} team.body.required - Team object that needs to be added
 * @returns {Team.model} 201 - Created team
 * @returns {Error} default - Unexpected error
 */
router.post('/', createTeam);

/**
 * Get a team by ID
 * @route GET /teams/{id}
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @returns {Team.model} 200 - Team object
 * @returns {Error} 404 - Team not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', getTeamById);

/**
 * Update a team
 * @route PUT /teams/{id}
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @param {TeamInput.model} team.body.required - Team object that needs to be updated
 * @returns {Team.model} 200 - Updated team
 * @returns {Error} 404 - Team not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', updateTeam);

/**
 * Delete a team
 * @route DELETE /teams/{id}
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @returns {object} 204 - Team deleted successfully
 * @returns {Error} 404 - Team not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', deleteTeam);

/**
 * Add a user to a team
 * @route POST /teams/{id}/users
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @param {UserTeamOperation.model} user.body.required - User object to be added to the team
 * @returns {Team.model} 200 - Updated team
 * @returns {Error} 404 - Team or User not found
 * @returns {Error} default - Unexpected error
 */
router.post('/:id/users', addUserToTeam);

/**
 * Remove a user from a team
 * @route DELETE /teams/{id}/users/{userId}
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @param {integer} userId.path.required - User ID to be removed from the team
 * @returns {Team.model} 200 - Updated team
 * @returns {Error} 404 - Team or User not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id/users/:userId', removeUserFromTeam);

export default router;