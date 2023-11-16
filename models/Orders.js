const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    carId:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String
    },
    address:{
        type: String
    },
    zipCode:{
        type: String
    },
    state:{
        type: String
    },
    creditScore:{
        type: String
    },
    start: {
        type:Date
    }
},
{collection:'cars'}
)

const car = mongoose.model("Order",orderSchema);

module.exports = car;