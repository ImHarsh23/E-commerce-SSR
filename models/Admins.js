const mongoose = require("mongoose");
const products = require("./products");
const {Schema} = mongoose;

const AdminSchema  = new Schema({
    name:{
        type: String,
        required: true
    }, 

    email:{
        type: String,
        required: true,
        unique:true
    },

    role:{
        type:String,
        default:"admin"
    },

    password :{
        type:String
    }
});

module.exports = mongoose.model('Admins', AdminSchema);
