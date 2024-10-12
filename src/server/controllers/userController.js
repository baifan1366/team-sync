// server/controllers/userController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: `Error fetching users: ${error.message}` });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: `Error creating user: ${error.message}` });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error fetching user: ${error.message}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: `Error updating user: ${error.message}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: `Error deleting user: ${error.message}` });
  }
};