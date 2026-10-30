require("dotenv").config();
const jwt =require("jsonwebtoken");
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const sequelize = require("./config/db");
const User = require("./model/User");
const Message = require("./model/Message");

require("./model/associations");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");

const app = express();

// Allow frontend origin
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Group Chat Backend is running!");
});

const PORT = 5000;

// 1. Create HTTP server using Express
const server = http.createServer(app);

// 2. Attach Socket.IO to HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication token missing"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        socket.user = decoded;

        next();

    } catch (error) {
        next(new Error("Invalid or expired token"));
    }
});

// 3. Listen for client connections
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);


    console.log("User ID:", socket.user.userId);

    console.log("Socket ID:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully!");

        await sequelize.sync();
        console.log("Database tables synchronized!");

        // 4. Start HTTP server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

startServer();
