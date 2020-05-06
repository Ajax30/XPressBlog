const express = require('express');
const postsController = require('../../controllers/front-end/posts');

// Express router
const router = express.Router();

// Get Posts
router.get('/', postsController.getPosts);

// Get Posts by Category
router.get('/category/:catname', postsController.getPostsByCategory);

// Get Single Post
router.get('/:id', postsController.getSinglePost);

module.exports = router;