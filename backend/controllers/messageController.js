const Message = require("../model/Message");

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

module.exports = { sendMessage };