const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const avatarpath = path.join('/uploads/users/avatars');

const userschema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', avatarpath));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

//static function 
userschema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userschema.statics.avatarpath = avatarpath;


const socialusers = mongoose.model('user', userschema);
module.exports = socialusers;