const express = require('express');
const app = express();
const port = 5000;
const server = require("http").createServer(app);
// const bodyParser = require('body-parser');
const connectToMongo = require('./db');

app.use(express.json())
const io = require("socket.io")(server, {
    // allowing cross-origin
    cors: {
        origin: "*",
    }
});

connectToMongo();

// app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api/auth', require('./routes/auth'));

// connection is established when client server starts
io.on("connection", (socket) => {
    // console.log("This is socket: ", socket);
    // getting the unique id of that particular socket
    let id = socket.id;
    // sending the id to the client on first initialization
    socket.emit("myId", { id });

    // declaring what to do when an action named "sendMes" is emmited
    socket.on("sendMes", (payload) => {
        // console.log("This is Payload: ", payload);
        // sending data to the client in response to the action emmited
        io.emit("sendMes", { ...payload });
    })
})

server.listen(port, () => {
    console.log("Server is listening on Port: ", port);
})