const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    counterType: String,
    count: Number
});

const Counter = mongoose.model('counter', counterSchema);

module.exports = Counter;
