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
        unique:true
    },

    role:{
        type:String,
        default:"user"
    },

    password :{
        type:String
    },

    googleAccessToken:{
        type: String
    },

    googleId:{
        type: String
    },

    googleImg:{
        type: String
    },

    order: [{
        products:[],
        totalPrice: Number,
        data:{
            type:Date,
            default:Date.now
        }
    }],

    cart:[{
        id:{
            type: Schema.Types.ObjectId,
            ref:"products",
            required: true
        },
        qty: Number
    }]
})

module.exports = mongoose.model('users', userSchema);
