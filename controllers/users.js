// init express for creating routes
const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');

// import sha256 for hashing passwords
const sha256 = require('sha256');

// create a new user
userRouter.post('/register',  async (req, res) => {
    // create a new user frpm the User model, data is in json format in req.body
    const user = new User(req.body);

    // use sha256 to hash the password
    user.password = sha256(user.password);

    await user.save(
        // on error send back 400 status code and error message
        (err, user) => {
            if (err) {
                res.status(400)
                res.json({
                    message: err.message,
                    success: false
                })
            } else {
                // on success send back 200 status code and success message
                res.status(200)
                res.json({
                    message: 'User created',
                    name: user.name,
                    success: true
                })
            }
        }
    );
});


// create a route for authentication with name and password
userRouter.post('/login', async (req, res) => {
    // data is in this format in req.body: { name: 'name', password: 'password' }, find user by name
    const user = await User({ name: req.body.name });
    // if user does not exist send back unauthentificated status code
    if (!user) {
        res.status(401);
        res.json({
            message: 'Wrong name or password',
            success: false
        })
    }

    // hash the password
    const password = sha256(req.body.password);
    // if password is wrong send back unauthentificated status code
    if (password !== user.password) {
        res.status(401);
        res.json({
            message: 'Wrong name or password',
            success: false
        })
    }


});

module.exports = userRouter;
