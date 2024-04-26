const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type:String,
        require:true
    },

    price: {
        type: Number,
        require: true
    },

    description: {
        type:String,
        require: true
    },

    reviews : [
        {
            type:String
        }
    ],

    seller: {
        type:String,
        require:true
    },

    imageurl: {
        type:String,
        require:true
    }, 

    category: {
        type: String, 
        require:true
    }
})

module.exports = mongoose.model("products",productSchema);


