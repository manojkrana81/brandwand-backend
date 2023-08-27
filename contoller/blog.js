const Blog = require('../models/blog');
const Counter = require('../models/counter');
const slugify = require('slugify');

const createBlog = async (req, res) => {
    try {
        const counter = await Counter.findOne({ counterType: 'blog' });
        const count = counter.count;
        const slug = slugify(req.body.title).toLowerCase();
        const newBlog = new Blog({ ...req.body, id: count, url: slug });
        await newBlog.save();
        const newCounter = await Counter.findOneAndUpdate({ counterType: 'blog' }, { count: count + 1 });
        return res.status(200).json({
            status: 'ok',
            message: 'Blog saved successfully',
            data: newBlog
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedBlog = await Blog.findOneAndUpdate({ id: id }, {...req.body, updatedDate: Date.now()});
        return res.status(200).json({
            status: 'ok',
            message: 'Blog updated successfully',
            data: updatedBlog
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedBlog = await Blog.findOneAndDelete({ id: id });
        return res.status(200).json({
            status: 'ok',
            message: 'Blog deleted successfully',
            data: deletedBlog
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ updatedDate: -1 });
        return res.status(200).json({
            status: 'ok',
            message: 'All Blogs',
            data: blogs
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ id: req.params.id });
        return res.status(200).json({
            status: 'ok',
            message: 'Blog',
            data: blog
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}

const getPublishedBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ id: req.params.id, status: 'published' });
        return res.status(200).json({
            status: 'ok',
            message: 'Blog',
            data: blog
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}

const publishBlog = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedBlog = await Blog.findOneAndUpdate({ id: id }, { status: 'published', publishedDate: Date.now() });
        return res.status(200).json({
            status: 'ok',
            message: 'Blog published successfully',
            data: updatedBlog
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}

const switchToDraft = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedBlog = await Blog.findOneAndUpdate({ id: id }, { status: 'draft' });
        return res.status(200).json({
            status: 'ok',
            message: 'Blog saved as draft successfully',
            data: updatedBlog
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}


const getBlogsPageWise = async (req, res) => {

    try {
        const { limit, page } = req.body;
        const totalBlogs = await Blog.countDocuments({status: 'published'});
        const blogs = await Blog.find({ status: 'published' }).sort({ publishedDate: -1 }).skip(limit * (page - 1)).limit(limit);
        return res.status(200).json({
            status: 'ok',
            message: `Page ${page} of ${totalBlogs}`,
            data: {
                blogs: blogs,
                total: totalBlogs,
            }
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}



module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlog,
    getPublishedBlog,
    publishBlog,
    switchToDraft,
    getBlogsPageWise,
}