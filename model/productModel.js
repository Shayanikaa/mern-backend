const mongoose = require("mongoose");

const prod = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    company:{
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true,
    }

},
{ collection:'product-form'});

const model = mongoose.model('prodData',prod);
module.exports = model