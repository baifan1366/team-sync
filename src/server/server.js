const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3001',
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https']
    },
    basedir: __dirname + '/../', // 设置为 src 的绝对路径
    files: ['./server/routes/**/*.js'], // 这里的路径相对于 basedir
};
expressSwagger(options)

// 中间件
app.use(express.json());

// 示例路由
app.get('/api/hello', (req, res) => {
    res.send('Hello from Express!');
  });

// 用户相关路由
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// 团队相关路由
const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams', teamRoutes);

// 聊天相关路由
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chats', chatRoutes);

// 任务相关路由
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// 项目相关路由
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    prisma.$disconnect()
  })
})