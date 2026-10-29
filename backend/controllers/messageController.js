const Message = require("../model/Message");
const User = require("../model/User");

// POST /api/messages — Save a new message
const sendMessage = async (req, res) => {
try {
const text = String(req.body.text || "").trim();

if (!text) {
  return res.status(400).json({
    message: "Message cannot be empty",
  });
}

const message = await Message.create({
  text,
  userId: req.user.id,
});

return res.status(201).json({
  message: "Message saved successfully",
  data: message,
});

} catch (error) {
console.error("Send message error:", error);

return res.status(500).json({
  message: "Failed to save message",
});

}
};

// GET /api/messages — Fetch previous messages
const getMessages = async (req, res) => {
try {
const messages = await Message.findAll({
include: [
{
model: User,
attributes: ["id", "name"],
},
],
order: [["createdAt", "ASC"]],
});

return res.status(200).json({
  data: messages,
});


} catch (error) {
console.error("Fetch messages error:", error);

return res.status(500).json({
  message: "Failed to fetch messages",
});

}
};

module.exports = { sendMessage, getMessages };
