const express = require('express');
const app = express();
const port = 5000;
const server = require("http").createServer(app);
const connectToMongo = require('./db');
const cors = require('cors')

const jwt = require('jsonwebtoken');
require("dotenv").config();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json())
const io = require("socket.io")(server, {
    // allowing cross-origin
    cors: {
        origin: "*",
        // allowedHeaders: ["X-authToken"],
    }
});

connectToMongo();

// app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api/auth', require('./routes/auth'));

// io.engine.generateId = (req) => {
// return Math.random()*1000; 
// must be unique across all Socket.IO servers
// }

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            console.log("Error in JWT token");
            socket.disconnect();
            return;
        }
        console.log("JWT token Verified");
        next();
    });
});

// connection is established when client server starts
io.on("connection", (socket) => {
    socket.id = socket.handshake.auth.userId;
    // getting the unique id of that particular socket
    // let id = socket.id;
    // sending the id to the client on first initialization
    // socket.emit("myId", { id });

    // declaring what to do when an action named "sendMes" is emmited
    socket.on("sendMes", (payload) => {
        // console.log("This is Payload: ", payload);
        // sending data to the client in response to the action emmited
        io.emit("sendMes", { ...payload });
    });

    socket.on("privateMes", (payload) => {
        io.to(payload.sendTo).emit("privateMes", { ...payload });
    })
})

server.listen(port, () => {
    console.log("Server is listening on Port: ", port);
})