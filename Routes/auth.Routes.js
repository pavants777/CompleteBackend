const express = require('express');
const multer = require('multer');
const bcryptjs = require('bcryptjs');
const UserModel = require('../Models/user.model'); 

const authRoutes = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

authRoutes.get('/next', (req, res) => {
    res.send('Hello World');
});

// Create New Users 
authRoutes.post('/signUp', upload, async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Image file is required.');
    }

    const { userName, userEmail, password } = req.body;

    try {
        const existingUserName = await UserModel.findOne({ userName });
        if (existingUserName) {
            return res.status(400).send('Change UserName, this UserName already exists.');
        }

        const existingUserEmail = await UserModel.findOne({ userEmail });
        if (existingUserEmail) {
            return res.status(400).send('Change UserEmail, this UserEmail is already associated with an existing user.');
        }

        const hashPassword = await bcryptjs.hash(password, 8);

        const newUser = new UserModel({
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            userName: userName,
            userEmail: userEmail,
            password: hashPassword
        });

        const savedUser = await newUser.save();
        return res.status(200).send('User is Saved');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message });
    }
});

module.exports = authRoutes;
