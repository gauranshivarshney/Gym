const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/gym");

const gymSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: { 
        type: String,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    plans: {
        type: String,
        required: true
    },
    totalCost: {
        type: String,
    },
    planCost: {
        type: Number
    },
    is_verifed: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', gymSchema);