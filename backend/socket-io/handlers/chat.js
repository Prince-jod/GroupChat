const chatHandler = (io, socket) => {

    console.log("Chat handler initialized for user:", socket.user.id);

    socket.on("sendMessage", (message) => {

        console.log("Message received:", message);

        io.emit("receiveMessage", {
            userId: socket.user.id,
            text: message.text,
            createdAt: new Date()
        });

    });

};

module.exports = chatHandler;