const { Server } = require("socket.io");

const socketAuth = require("./middleware");
const chatHandler = require("./handlers/chat");

const initializeSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    // Authenticate every socket connection
    io.use(socketAuth);

    io.on("connection", (socket) => {

        console.log("User connected:", socket.user.id);
        console.log("Socket ID:", socket.id);

        // Register chat events
        chatHandler(io, socket);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.user.id);
        });

    });

    return io;
};

module.exports = initializeSocket;