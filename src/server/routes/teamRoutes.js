const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

/**
 * @typedef {object} Team
 * @property {integer} id - Team ID
 * @property {string} name - Team name
 * @property {string} description - Team description
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {object} TeamInput
 * @property {string} name - Team name
 * @property {string} description - Team description
 */

/**
 * Get all teams
 * @route GET /api/teams
 * @group Teams - Operations about teams
 * @returns {Array.<Team>} 200 - An array of team objects
 * @returns {Error} default - Unexpected error
 */
router.get('/', teamController.getAllTeams);

/**
 * Create a new team
 * @route POST /api/teams
 * @group Teams - Operations about teams
 * @param {TeamInput.model} team.body.required - Team object that needs to be added
 * @returns {Team.model} 201 - Created team
 * @returns {Error} default - Unexpected error
 */
router.post('/', teamController.createTeam);

/**
 * Get a team by ID
 * @route GET /api/teams/{id}
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @returns {Team.model} 200 - Team object
 * @returns {Error} 404 - Team not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', teamController.getTeamById);

/**
 * Update a team
 * @route PUT /api/teams/{id}
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @param {TeamInput.model} team.body.required - Team object that needs to be updated
 * @returns {Team.model} 200 - Updated team
 * @returns {Error} 404 - Team not found
 * @returns {Error} default - Unexpected error
 */
router.put('/:id', teamController.updateTeam);

/**
 * Delete a team
 * @route DELETE /api/teams/{id}
 * @group Teams - Operations about teams
 * @param {integer} id.path.required - Team ID
 * @returns {null} 204 - Team deleted successfully
 * @returns {Error} 404 - Team not found
 * @returns {Error} default - Unexpected error
 */
router.delete('/:id', teamController.deleteTeam);

module.exports = router;