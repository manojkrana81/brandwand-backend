const express = require('express');
const blogController = require('../contoller/blog');
const loginController = require('../contoller/login');
const queryController = require('../contoller/queries');

const router = express.Router();

router.post('/login', loginController.login);
router.post('/get-published-blogs', blogController.getBlogsPageWise);
router.get('/published-blog/:id', blogController.getPublishedBlog);
router.post('/add-query', queryController.addQuery);

module.exports = router;