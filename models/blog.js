const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    id: String,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailUrl: String,
    url:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'draft'
    },
    author: {
        type: String,
        required: true
    },
    body: String,
    comments: [],
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: String,
        default: 'admin'
    },
    updatedBy: {
        type: String,
        default: 'admin'
    },
    publishedDate: {
        type: Date,
        default: Date.now()
    },
    publishedBy:{
        type: String,
        default: 'admin'
    }
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;