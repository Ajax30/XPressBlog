
const express = require('express');
const imageUploader = require('../../utils/imageupload.js');
const validator = require('../../utils/validation.js');
const dashboardController = require('../../controllers/admin/dashboard');

// Express router
const router = express.Router();

// Display Dashboard
router.get('/', dashboardController.displayDashboard);

// Render add Post Form
router.get('/addpost', dashboardController.addPostForm);

// Add Post
router.post('/post/add', imageUploader.upload, validator.addPostCheck, dashboardController.addPost);

// Edit Post
router.get('/post/edit/:id', dashboardController.editPost);

// Update Post
router.post('/post/update/:id', validator.addPostCheck, dashboardController.updatePost);

// Delete Post
router.delete('/post/delete/:id', dashboardController.deletePost);

module.exports = router;