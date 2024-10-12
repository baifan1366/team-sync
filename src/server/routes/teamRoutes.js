import express from 'express';
const router = express.Router();
import { getAllTeams, createTeam, getTeamById, updateTeam, deleteTeam } from '../controllers/teamController.js';

/**
 * @typedef Team
 * @property {integer} id.required - Team ID
 * @property {string} name.required - Team name
 * @property {string} description - Team description
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef TeamInput
 * @property {string} name.required - Team name
 * @property {string} description - Team description
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

export default router;