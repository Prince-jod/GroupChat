const express = require("express");
const sequelize = require("./config/db");
const User =require("./model/User");
const authRoutes = require("./routes/authRoutes");
const cors =require('cors');
const app = express();

// here i am allowing the front origin
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
    res.send("Group Chat Backend is running!");
});

const PORT = 5000;

async function startServer() {
try {
await sequelize.authenticate();
console.log("MySQL connected successfully!");

    await sequelize.sync({alter : true});
    console.log("Database tables synchronized!");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error("Database connection failed:", error);
}

}

startServer();


startServer();