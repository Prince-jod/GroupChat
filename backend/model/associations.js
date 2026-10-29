const User = require("./User");
const Message = require("./Message");

console.log("User model:", User.name);
console.log("Message model:", Message.name);
console.log("User is Sequelize model:", User.prototype instanceof require("sequelize").Model);
console.log("Message is Sequelize model:", Message.prototype instanceof require("sequelize").Model);

User.hasMany(Message, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Message.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = { User, Message };