const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        min:6
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:2020
    },

    date:{
        type:Date,
        default:Date.now()
    }

    




});


module.exports = mongoose.model('user', RegisterSchema)