const mongoose = require("mongoose");
const products = require("./products");
const {Schema} = mongoose;

const userSchema  = new Schema({
    name:{
        type: String,
        required: true
    }, 

    email:{
        type: String,
        required: true,
        unique:true
    },

    password :{
        type:String
    },

})

module.exports = mongoose.model('Admins', AdminSchema);
