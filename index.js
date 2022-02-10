const express = require('express');
const app = express();
const port = 5000;
const server = require("http").createServer(app);
const connectToMongo = require('./db');
const cors = require('cors')

const jwt = require('jsonwebtoken');
require("dotenv").config();

const bodyParser = require("body-parser");
const saveMessageToDb = require('./functions/dbFunctions');

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
app.use('/api/search', require('./routes/clients'));
app.use('/api/user', require('./routes/personal'));

// io.engine.generateId = (req) => {
// return Math.random()*1000; 
// must be unique across all Socket.IO servers
// }

let liveUsers = [];

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            console.log("Error in JWT token");
            socket.disconnect();
            return;
        }
        next();
    });
});

// connection is established when client server starts
io.on("connection", (socket) => {
    socket.id = socket.handshake.auth.userId;
    liveUsers.push(socket);

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

    socket.join("privateRoom");

    // send a private message to someone with his/her userId which is in payload i.e. payload.to
    socket.on("privateMes", (payload) => {
        // saving chat message to the DB
        saveMessageToDb(payload);
        console.log(payload);
        io.to(payload.to).emit("privateMes", { ...payload });
        io.emit("privateMes", { ...payload });
    });

    socket.on("disconnect", (socket) => {
        liveUsers.splice(liveUsers.indexOf(socket), 1);
    });
})

server.listen(port, () => {
    console.log("Server is listening on Port: ", port);
})