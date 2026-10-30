require("dotenv").config();

const http = require("http");
const express = require("express");
const sequelize = require("./config/db");

require("./model/associations");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");

// Create Express application
const app = express();

// Allow frontend origin
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Group Chat Backend is running!");
});

const PORT = 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const initializeSocket = require("./socket-io");
const io = initializeSocket(server);

// Make io accessible to Express controllers
app.set("io", io);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully!");

        await sequelize.sync();
        console.log("Database tables synchronized!");

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

startServer();
