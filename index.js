const PORT = process.env.PORT || 8000;
const io = require('socket.io')(PORT, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"]
    }
});

const users = {};

// Handle new client connections
io.on('connection', socket => {
    // Handle new user joining the chat
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); // Notify other users about the new user
    });

    // Handle sending messages from the client
    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        });
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});

console.log(`Server is running on port ${PORT}`);
