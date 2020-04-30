const express = require('express');
const postsController = require('../../controllers/front-end/posts');

// Express router
const router = express.Router();

// Get Posts
router.get('/', postsController.getPosts);

// Get Single Post
router.get('/:id', postsController.getSinglePost);

// Get Posts by Category
router.get('/:catname', postsController.getPostsByCategory);

module.exports = router;