const User = require("./User");
const Message = require("./Message");

console.log("User model:", typeof User, User?.name);
console.log("Message model:", typeof Message, Message?.name);

User.hasMany(Message, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Message.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = { User, Message };