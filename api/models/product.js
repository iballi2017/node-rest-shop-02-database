//To define how the product should look like in the application

//Import mongoose
const mongoose = require('mongoose');

//create the schema
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

//export the schema
module.exports = mongoose.model('Product', productSchema); //this will be imported in the routing folder i.e routes/products.js