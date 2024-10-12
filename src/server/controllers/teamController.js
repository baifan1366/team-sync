// server/controllers/teamController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllTeams = async (req, res) => {  
  try {
    const teams = await prisma.team.findMany();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: `Error fetching teams: ${error.message}` });
  }
};

export const createTeam = async (req, res) => {
  try {
    const newTeam = await prisma.team.create({
      data: req.body,
    });
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ error: `Error creating team: ${error.message}` });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error fetching team: ${error.message}` });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await prisma.team.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ error: `Error updating team: ${error.message}` });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    await prisma.team.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: `Error deleting team: ${error.message}` });
  }
};