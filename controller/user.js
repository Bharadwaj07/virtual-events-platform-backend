const userService = require('../services/user');
const { validationResult } = require('express-validator');
const { comparePassword } = require('../utils/password');
const {generateToken} = require('../services/jwt')


const registerUserController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const userData = req.body;
        const existingUser = userService.getUserByEmail(userData.email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        await userService.createUser(userData);
        res.status(200).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const loginUserController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = await generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const updateUserController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const userData = req.body;
        await userService.updateUser(userData.email, { ...userData });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const deleteUserController = async(req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const { email } = req.body;
        await userService.deleteUser(email);
        res.status(201);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    registerUserController,
    loginUserController,
    updateUserController,
    deleteUserController
}