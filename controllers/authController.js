const { registerUser } = require('../services/authServices');
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        await registerUser({ username, password })
        res.status(201).send("Registration successful")
    }
    catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const user = req.body;
    const token = jwt.sign({id: req.user._id}, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, message: 'Login successful' });
}

module.exports = {
    register,
    login
}



