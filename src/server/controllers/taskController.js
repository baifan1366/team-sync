// server/controllers/taskController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllTasks = async (req, res) => {  
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: `Error fetching tasks: ${error.message}` });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = await prisma.task.create({
      data: req.body,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: `Error creating task: ${error.message}` });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error fetching task: ${error.message}` });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: `Error updating task: ${error.message}` });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: `Error deleting task: ${error.message}` });
  }
};