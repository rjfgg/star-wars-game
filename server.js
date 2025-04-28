const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// 静态文件服务
app.use(express.static(path.join(__dirname, '.')));

// 存储所有连接的客户端
const clients = {};

// 处理 Socket.IO 连接
io.on('connection', (socket) => {
    console.log('A user connected');

    // 存储新连接的客户端
    clients[socket.id] = socket;

    // 监听客户端发送的消息
    socket.on('message', (data) => {
        // 将消息广播给所有连接的客户端
        io.emit('message', data);
    });

    // 处理客户端断开连接
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        delete clients[socket.id];
    });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});