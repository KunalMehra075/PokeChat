const http = require("http")
const UserRouter = require("./Routes/User.route");
const connection = require("./Config/db");
const express = require("express");
const cors = require("cors")
const socketio = require("socket.io");
const LogsModel = require("./Models/Logs.model");
const LogsRouter = require("./Routes/Logs.route");

const app = express();
app.use(express.json());


app.use(cors())
app.use("/users", UserRouter)
app.use("/logs", LogsRouter)


app.get("/", (req, res) => {
    try {
        res.status(200).json({ Message: "Welcome to WhatsApp Chat Application" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB");
    }
    console.log(`Server is Rocking on port ${PORT}`);
});

const ChatServer = socketio(server, { cors: { origin: "*" } });

ChatServer.on("connection", (socket) => {

    console.log("New Client Connected", socket.id);
    socket.on("send-chat-message", (message) => {
        socket.broadcast.emit("chat-message", message);
    });
    socket.on("new-user", async (data) => {
        let log = new LogsModel({ socketID: socket.id, UserName: data.UserName, createdAt: new Date().toISOString() })
        await log.save()
        socket.broadcast.emit("user_connected", data);
    });
    // socket.on("disconnect", async () => {
    //     let log = await LogsModel.findOne({ socketID: socket.id })
    //     // console.log(log);
    //     setTimeout(() => {
    //         socket.broadcast.emit("user_disconnect", log);
    //     }, 700);
    // });
});
