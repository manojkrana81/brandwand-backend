const express = require('express');
const adminRouter = express.Router();
const verifyToken = require('../middleware/verifyToken');
const fileUploadMiddleware = require('../middleware/fileUpload');

const blogController = require('../contoller/blog');
const counterController = require('../contoller/counter');
const fileUploadController = require('../contoller/fileUpload');

adminRouter.get('/all-blogs', verifyToken, blogController.getAllBlogs);
adminRouter.get('/blog/:id', verifyToken, blogController.getBlog);
adminRouter.post('/create-blog', verifyToken, blogController.createBlog);
adminRouter.post('/update-blog', verifyToken, blogController.updateBlog);
adminRouter.post('/delete-blog', verifyToken, blogController.deleteBlog);
adminRouter.post('/publish-blog', verifyToken, blogController.publishBlog);
adminRouter.post('/switch-to-draft', verifyToken, blogController.switchToDraft);

adminRouter.get('/create-counter/:counterType', verifyToken, counterController.createCounter);
adminRouter.post('/upload', verifyToken, fileUploadMiddleware, fileUploadController.fileUpload);
adminRouter.post('/get-files', verifyToken, fileUploadController.getFiles);


module.exports = adminRouter;

