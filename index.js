const app = require('express')();
const port = 5000;
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
<<<<<<< HEAD
    // allowing cross-origin
=======
>>>>>>> bf244054ff142514c50c479d8a6a3a27036f10b7
    cors: {
        origin: "*",
    }
});

<<<<<<< HEAD
// connection is established when client server starts
io.on("connection", (socket) => {
    // console.log("This is socket: ", socket);
    // getting the unique id of that particular socket
    let id = socket.id;

    // declaring what to do when an action named "sendMes" is emmited
    socket.on("sendMes", (payload) => {
        // console.log("This is Payload: ", payload);
        // sending data to the client in response to the action emmited
        io.emit("sendMes", {...payload, id});
=======
io.on("connection", (socket) => {
    console.log("This is socket: ", socket);

    socket.on("sendMes", (payload) => {
        console.log("This is Payload: ", payload);
        io.emit("sendMes", payload);
>>>>>>> bf244054ff142514c50c479d8a6a3a27036f10b7
    })
})

server.listen(port, () => {
    console.log("Server is listening on Port: ", port);
})