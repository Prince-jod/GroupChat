require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const User =require("./model/User");
const Message = require("./model/Message");
require("./model/associations");

const authRoutes = require("./routes/authRoutes");
const messageRoutes=require("./routes/messageRoutes");
const cors =require('cors');
const app = express();

// here i am allowing the front origin
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Group Chat Backend is running!");
});

const PORT = 5000;

async function startServer() {
try {
await sequelize.authenticate();
console.log("MySQL connected successfully!");

    await sequelize.sync();
    console.log("Database tables synchronized!");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error("Database connection failed:", error);
}

}

startServer();