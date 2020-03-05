
const express = require('express');
const dashboardController = require('../../controllers/admin/dashboard');

// Express router
const router = express.Router();

// Display Dashboard
router.get('/', dashboardController.displayDashboard);

// Render add Post Form
router.get('/addpost', dashboardController.addPostForm);

// Add Post
router.post('/post/add', dashboardController.addPost);

// Edit Post
router.get('/post/edit/:id', dashboardController.editPost);

// Update Post
router.post('/post/update/:id', dashboardController.updatePost);

// Delete Post
router.delete('/post/delete/:id', dashboardController.deletePost);

module.exports = router;