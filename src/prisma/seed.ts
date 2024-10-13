import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      cognitoId: uuidv4(),
      username: 'john_doe',
      profilePictureUrl: 'https://example.com/john.jpg',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      cognitoId: uuidv4(),
      username: 'jane_smith',
      profilePictureUrl: 'https://example.com/jane.jpg',
    },
  })

  const user3 = await prisma.user.create({
    data: {
      cognitoId: uuidv4(),
      username: 'bob_johnson',
      profilePictureUrl: 'https://example.com/bob.jpg',
    },
  })

  // Create Teams
  const team1 = await prisma.team.create({
    data: {
      teamName: 'Development Team',
      productOwnerUserId: user1.userId,
      projectManagerUserId: user2.userId,
      user: {
        connect: [{ userId: user1.userId }, { userId: user2.userId }],
      },
    },
  })

  const team2 = await prisma.team.create({
    data: {
      teamName: 'Marketing Team',
      productOwnerUserId: user2.userId,
      projectManagerUserId: user3.userId,
      user: {
        connect: [{ userId: user2.userId }, { userId: user3.userId }],
      },
    },
  })

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Redesign the company website',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      projectTeams: {
        create: {
          teamId: team1.id,
        },
      },
    },
  })

  await prisma.project.create({
    data: {
      name: 'Product Launch',
      description: 'Launch the new product line',
      startDate: new Date(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      projectTeams: {
        create: {
          teamId: team2.id,
        },
      },
    },
  })

  // Create Tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Design Homepage',
      description: 'Create a new design for the homepage',
      status: 'In Progress',
      priority: 'High',
      tags: 'design,frontend',
      startDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      points: 8,
      projectId: project1.id,
      authorUserId: user1.userId,
      assignedUserId: user2.userId,
    },
  })

  const task2 = await prisma.task.create({
    data: {
      title: 'Implement Backend API',
      description: 'Develop the backend API for the new features',
      status: 'Not Started',
      priority: 'Medium',
      tags: 'backend,api',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      points: 13,
      projectId: project1.id,
      authorUserId: user2.userId,
      assignedUserId: user1.userId,
    },
  })

  // Create TaskAssignments
  await prisma.taskAssignment.createMany({
    data: [
      { userId: user1.userId, taskId: task1.id },
      { userId: user2.userId, taskId: task2.id },
    ],
  })

  // Create Attachments
  await prisma.attachment.createMany({
    data: [
      {
        fileURL: 'https://example.com/homepage-design.png',
        fileName: 'homepage-design.png',
        taskId: task1.id,
        uploadedById: user2.userId,
      },
      {
        fileURL: 'https://example.com/api-specs.pdf',
        fileName: 'api-specs.pdf',
        taskId: task2.id,
        uploadedById: user1.userId,
      },
    ],
  })

  // Create Comments
  await prisma.comment.createMany({
    data: [
      {
        text: 'The homepage design looks great! Just a few minor tweaks needed.',
        taskId: task1.id,
        userId: user1.userId,
      },
      {
        text: "I've started working on the API. Let me know if you have any questions.",
        taskId: task2.id,
        userId: user2.userId,
      },
    ],
  })

  // Create ChatRooms
  const chatRoom1 = await prisma.chatRoom.create({
    data: {
      name: 'Website Redesign Discussion',
      isGroup: true,
      members: {
        connect: [{ userId: user1.userId }, { userId: user2.userId }],
      },
    },
  })

  const chatRoom2 = await prisma.chatRoom.create({
    data: {
      name: 'John and Jane',
      isGroup: false,
      members: {
        connect: [{ userId: user1.userId }, { userId: user2.userId }],
      },
    },
  })

  // Create Messages
  await prisma.message.createMany({
    data: [
      {
        content: "Hey team, how's the website redesign coming along?",
        senderId: user1.userId,
        chatRoomId: chatRoom1.id,
      },
      {
        content: "It's going well! I've finished the homepage design.",
        senderId: user2.userId,
        chatRoomId: chatRoom1.id,
      },
      {
        content: 'Hi Jane, can we discuss the API specifications?',
        senderId: user1.userId,
        chatRoomId: chatRoom2.id,
      },
      {
        content: 'Sure, John. What specific points would you like to discuss?',
        senderId: user2.userId,
        chatRoomId: chatRoom2.id,
      },
    ],
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })