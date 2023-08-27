const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    // id: String,
    fileType: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    uploadedDate: {
        type: Date,
        default: Date.now()
    }
});

const File = mongoose.model('file', fileSchema);

module.exports = File;