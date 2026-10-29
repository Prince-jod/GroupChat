const User = require("../model/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
try {
const { name, email, password, phone} = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        return res.status(409).json({
            message: "Email already registered"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        phone,
        password: hashedPassword
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
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
