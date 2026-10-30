const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication token missing"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.user = {
            id: decoded.userId
        };

        next();

    } catch (error) {
        next(new Error("Invalid or expired token"));
    }
};

module.exports = socketAuth;