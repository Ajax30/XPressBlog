
const express = require('express');
const imageUploader = require('../../utils/imageupload.js');
const validator = require('../../utils/validation.js');
const dashboardController = require('../../controllers/admin/dashboard');
const categoriesController = require('../../controllers/admin/categories');

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
router.post('/post/update/:id', imageUploader.upload, validator.addPostCheck, dashboardController.updatePost);

// Delete Post
router.delete('/post/delete/:id', dashboardController.deletePost);

// Display Categories
router.get('/categories', categoriesController.showCategories);

// Delete Category
router.delete('/category/delete/:id', categoriesController.deleteCategory);

module.exports = router;