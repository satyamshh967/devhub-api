const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../middleware/AppError");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new AppError(
            "Name, email and password are required",
            400
        );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError(
            "Email already registered",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError(
            "Email and password are required",
            400
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.json({
        message: "Login successful",
        token
    });
};

module.exports = {
    register,
    login
};