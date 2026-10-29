const User = require("../model/User");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const signup = async (req, res) => {
    try {
        const { name, identifier, password } = req.body;

        // Validate required fields
        if (!name?.trim() || !identifier?.trim() || !password) {
            return res.status(400).json({
                message: "Name, email/phone, and password are required"
            });
        }

        const value = identifier.trim();

        // Check whether identifier is an email
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        // Separate email and phone
        const email = isEmail ? value.toLowerCase() : null;
        const phone = isEmail ? null : value;

        // Check whether email or phone is already registered
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    ...(email ? [{ email }] : []),
                    ...(phone ? [{ phone }] : [])
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email or phone number is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name.trim(),
            email,
            phone,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { signup };
