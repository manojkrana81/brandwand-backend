const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    queriedAt: {
        type: Date,
        default: Date.now(),
    }
});

const userQuery = mongoose.model('userQuerie', querySchema);

module.exports = userQuery;