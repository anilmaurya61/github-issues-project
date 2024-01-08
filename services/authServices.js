const User = require('../models/user')

async function registerUser({ username, password }) {
    try {

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            const alreadyExistError = new Error("Username already exists");
            alreadyExistError.status = 400;
            throw alreadyExistError;
        }
        
        const newUser = new User({ username, password });
        await newUser.save();

    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser
}