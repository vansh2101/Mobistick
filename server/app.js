//? Imports
const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

require('dotenv').config();


//? Global variables

// token
const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const app = express();

app.use(cors());


const server = http.createServer(app);

let server_devices = {};


//? Server functions

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('connect_device', data => {
        const { room } = data;
        socket.join(room)

        socket.on('transmit', data => {
            console.log(data)
            io.in(room).emit('receive', data)
        })

    })

    // socket.on('server_connect', data => {
    //     server_devices[socket.id] = data.code;
    // })

})

//? Routes

/*
app.get('/', (req, res) => {
    res.send('Joystick Server')
})
*/

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get("/token", (req, res) => {
    // create a 16 character random string
    res.send(secret);
})

server.listen(8000, () => 'Server is listening on port 8000');