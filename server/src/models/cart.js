const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CartSchema = new mongoose.Schema({
    product:{
        type: String,
        required: true,
    },
    images:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

const Cart = mongoose.model('cartData', CartSchema)
module.exports = Cart