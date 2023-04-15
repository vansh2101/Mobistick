//? Imports
const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');


//? Global variables
const app = express();

app.use(cors());

const server = http.createServer(app);


//? Server functions
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('transmit', data => {
        console.log(data)
    })
})


//? Routes

app.get('/', (req, res) => {
    res.send('Joystick Server')
})


server.listen(8000, () => 'Server is listening on port 8000');