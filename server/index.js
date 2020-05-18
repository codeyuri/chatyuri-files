const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getOnlineUsers } = require('./users');
const router = require('./route');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

// check if connected to server with socket io
io.on('connection', (socket) => {
    console.log('Made socket connection:', socket.id);
    // io.eio.pingTimeout = 120000;
    // io.eio.pingInterval = 5000;

    socket.on('joinedChat', ({name}, callback) => {
        const { error, user } = addUser({id: socket.id, name});

        if(error) return callback(error);

        socket.emit('message', { user: 'Admin', text: `Welcome to our chatroom, ${user.name}!`, time: new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Singapore'}) });
        socket.broadcast.emit('message', { user: 'Admin', text: `${user.name} has joined the chatroom!`, time: new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Singapore'}) });

        io.emit('usersOnline', { users: getOnlineUsers() });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.emit('message', { user: user.name, text: message, time: new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Singapore'}) })

        callback();
    });

    socket.on('isTyping', (data) => {
        socket.broadcast.emit('isTyping', data);
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('User disconnected: ', socket.id);
        
        if(user) {
            io.emit('message', { user: 'Admin', text: `${user.name} has left.`, time: new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Singapore'}) })
            io.emit('usersOnline', { users: getOnlineUsers() });
        }
    });
});

app.use(router);
app.use(cors());
server.listen(port, () => console.log(`Server started... listening to port: ${port}`));