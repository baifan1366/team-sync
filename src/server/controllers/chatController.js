// server/controllers/chatController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllChats = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany();
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: `Error fetching chats: ${error.message}` });
  }
};

export const createChat = async (req, res) => {
  try {
    const newChat = await prisma.chat.create({
      data: req.body,
    });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ error: `Error creating chat: ${error.message}` });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (chat) {
      res.json(chat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error fetching chat: ${error.message}` });
  }
};

export const updateChat = async (req, res) => {
  try {
    const updatedChat = await prisma.chat.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedChat);
  } catch (error) {
    res.status(400).json({ error: `Error updating chat: ${error.message}` });
  }
};

export const deleteChat = async (req, res) => {
  try {
    await prisma.chat.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: `Error deleting chat: ${error.message}` });
  }
};