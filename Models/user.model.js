const mongoose = require('mongoose')


UserModel = mongoose.Schema({
    image: {
        data: {
            type: Buffer,
        },
        contentType: {
            type: String,
        }
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    userEmail : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }
})


UserModel = mongoose.model('Users',UserModel)

module.exports = UserModel