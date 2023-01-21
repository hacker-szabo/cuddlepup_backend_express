const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // name should be unique
    name: { type: String, required: true, unique: true },
    password: String,
    email: String,
    verified: Boolean
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
