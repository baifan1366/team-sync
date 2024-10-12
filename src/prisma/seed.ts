import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      password: await hash('password123', 10),
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: await hash('password456', 10),
    },
  })

  const user3 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Johnson',
      password: await hash('password789', 10),
    },
  })

  // Create Teams
  const team1 = await prisma.team.create({
    data: {
      name: 'Development Team',
      members: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  })

  const team2 = await prisma.team.create({
    data: {
      name: 'Marketing Team',
      members: {
        connect: [{ id: user2.id }, { id: user3.id }],
      },
    },
  })

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Redesign the company website',
      team: {
        connect: { id: team1.id },
      },
      members: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Product Launch',
      description: 'Launch the new product line',
      team: {
        connect: { id: team2.id },
      },
      members: {
        connect: [{ id: user2.id }, { id: user3.id }],
      },
    },
  })

  // Create Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Design Homepage',
        description: 'Create a new design for the homepage',
        status: 'In Progress',
        assigneeId: user1.id,
        projectId: project1.id,
      },
      {
        title: 'Implement Backend API',
        description: 'Develop the backend API for the new features',
        status: 'Not Started',
        assigneeId: user2.id,
        projectId: project1.id,
      },
      {
        title: 'Create Marketing Materials',
        description: 'Design brochures and social media posts',
        status: 'In Progress',
        assigneeId: user2.id,
        projectId: project2.id,
      },
      {
        title: 'Prepare Press Release',
        description: 'Write and review the press release for the product launch',
        status: 'Completed',
        assigneeId: user3.id,
        projectId: project2.id,
      },
    ],
  })

  // Create Chats
  await prisma.chat.createMany({
    data: [
      {
        message: "Hey team, how's the website redesign coming along?",
        senderId: user1.id,
      },
      {
        message: "It's going well! I've finished the homepage design.",
        senderId: user2.id,
      },
      {
        message: 'Great job on the press release, Bob!',
        senderId: user2.id,
      },
      {
        message: 'Thanks, Jane! Glad you liked it.',
        senderId: user3.id,
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