// server/controllers/projectController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await prisma.project.create({
      data: req.body,
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: 'Error creating project' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: 'Error updating project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting project' });
  }
};