const User = require("./User");
const Message = require("./Message");

console.log("User:", typeof User, User?.name);
console.log("Message:", typeof Message, Message?.name);
console.log("Message export:", require("./Message"));

if (typeof Message.hasMany === "function") {
    console.log("Message model loaded correctly");
} else {
    console.log("Message is NOT a Sequelize model");
}

User.hasMany(Message, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Message.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = { User, Message };