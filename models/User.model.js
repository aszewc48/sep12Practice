const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    myCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User