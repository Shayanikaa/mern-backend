const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

},
{ collection:'signup-form'});

const model = mongoose.model('userData',user);
module.exports = model