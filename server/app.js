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


/*// [auth0 STARTS]

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'B56lFOlb3NMsumqg8QBWgw6V21S2BWzq',
  issuerBaseURL: 'https://dev-j2rnlyab.us.auth0.com'
};

app.use(auth(config));

// [auth0 ENDS]*/


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

    socket.on('connect', data => {
        const { room } = data;
        socket.join(room)
    })

    socket.on('transmit', data => {
        io.in(room).emit('receive', data)
    })
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