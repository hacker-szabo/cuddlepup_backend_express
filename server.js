// express initialization
var express = require('express');
var app = express();

// import a library that reads the .env file into a variable
require('dotenv').config();

// include users controller
var userRouter = require('./controllers/users');

// use users controller for all routes starting with /users
app.use('/users', userRouter);

// start server on port 3000
app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 3000!');
});
