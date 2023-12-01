const mongoose = require('mongoose')
const { Schema } = mongoose;

const products = new Schema({
    title : {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price : {
        type: Number,
        required: true
    },
    rating : {
        type: Number,
        required: true
    },
    brand : {
        type: String,
        required: false
    },
    category : {
        type: String,
        required: false
    },
    thumbnail : {
        type: String,
        required: true
    }
},
{
    timestamps:true
}
);

const Product = mongoose.model('Product', products);

module.exports = Product;
