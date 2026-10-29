const express = require("express");
const sequelize = require("./config/db");
const User =require("./model/User");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Group Chat Backend is running!");
});

const PORT = 5000;

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log("MySQL connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

startServer();