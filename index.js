const express = require('express');
const app = express();
const port = process.env.PORT;
const server = require("http").createServer(app);
const connectToMongo = require('./db');
const cors = require('cors')

const jwt = require('jsonwebtoken');
require("dotenv").config();

const bodyParser = require("body-parser");
const { saveMessageToDb, getChat, setLastChat } = require('./functions/dbFunctions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json())
const io = require("socket.io")(server, {
    // allowing cross-origin
    cors: {
        origin: "*",
        credentials: true,
    }
});

connectToMongo();

// app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/search', require('./routes/clients'));
app.use('/api/user', require('./routes/personal'));
app.use('/api/status', require('./routes/status'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/pages/backendHomepage.html`);
  });

// WE CAN ALSO GENERATE OUR OWN SOCKET IO IDS
// io.engine.generateId = (req) => {
// return Math.random()*1000; 
// must be unique across all Socket.IO servers
// }

let liveUsers = new Set();

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            socket.disconnect();
            return;
        }
        next();
    });
});

// connection is established when client server starts
io.on("connection", (socket) => {
    socket.id = socket.handshake.auth.userId;
    liveUsers.add(socket);

    // getting the unique id of that particular socket
    // let id = socket.id;
    // sending the id to the client on first initialization
    // socket.emit("myId", { id });

    // get the chats of the user with another particular user
    socket.on("sendChat", async (payload) => {
        // due to a problem (i saved the chat of both the users on different collections hence need to abstract both of them)
        let response = await getChat(payload.user, payload.client);
        let response2 = await getChat(payload.client, payload.user);
        // sending/emmiting response to the client side
        io.emit("sendChat", { response, response2 });
    });

    // declaring what to do when an action named "sendMes" is emmited
    socket.on("sendMes", (payload) => {
        // console.log("This is Payload: ", payload);
        // sending data to the client in response to the action emmited
        setLastChat(payload.from, payload.to, payload.message);
        console.log(payload);
        io.emit("sendMes", { ...payload });
    });

    // maybe this line is not ever used in code
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
        // liveUsers.splice(liveUsers.indexOf(socket), 1);
        liveUsers.delete(socket);
    });
})

server.listen(port, () => {
    console.log("Server is listening on Port: ", port);
})