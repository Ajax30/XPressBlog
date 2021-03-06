const Post = require('../../models/post');
const Category = require('../../models/categories');
const {upload} = require('multer');
const {validationResult} = require('express-validator');

exports.displayDashboard = async (req, res, next) => {
    const posts = await Post.find({}, (err, posts) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render('admin/index', {
                layout: 'admin/layout',
                website_name: 'MEAN Blog',
                page_heading: 'Dashboard',
                posts: posts
            });
        }
    }).populate('category');
};

exports.addPostForm = async (req, res, next) => {
    const categories = await Category.find({}, (err, categories) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render('admin/addpost', {
                layout: 'admin/layout',
                website_name: 'MEAN Blog',
                page_heading: 'Dashboard',
                page_subheading: 'Add New Post',
                categories: categories
            });
        }
    });
}

exports.addPost = (req, res, next) => {

    const form = {
        titleholder: req.body.title,
        excerptholder: req.body.excerpt,
        bodyholder: req.body.body
    };

    const errors = validationResult(req);

    const post = new Post();

    post.title = req.body.title;
    post.short_description = req.body.excerpt
    post.full_text = req.body.body;
    post.category = req.body.category;
    if (req.file) {
        post.post_image = req.file.filename;
    }

    if (!errors.isEmpty()) {
        const categories = Category.find({}, (err, categories) => {
            req.flash('danger', errors.array())
            res.render('admin/addpost', {
                layout: 'admin/layout',
                website_name: 'MEAN Blog',
                page_heading: 'Dashboard',
                page_subheading: 'Add New Post',
                categories: categories,
                form: form
            });
        });
    } else {
        post.save(function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', "The post was successfully added");
                req.session.save(() => res.redirect('/dashboard'));
            }
        });
    }
}

exports.editPost = async (req, res, next) => {
    const postId = req.params.id;

    Post.findById(postId, function(err, post) {
        const categories = Category.find({}, (err, categories) => {
            if (err) {
                console.log('Error: ', err);
            } else {
                res.render('admin/editpost', {
                    layout: 'admin/layout',
                    website_name: 'MEAN Blog',
                    page_heading: 'Dashboard',
                    page_subheading: 'Edit Post',
                    categories: categories,
                    post: post
                });
            }
        });
    });
}

exports.updatePost = (req, res, next) => {

    const query = {
        _id: req.params.id
    }

    const form = {
        titleholder: req.body.title,
        excerptholder: req.body.excerpt,
        bodyholder: req.body.body
    };

    const errors = validationResult(req);

    const post = {};

    post._id = req.params.id;
    post.title = req.body.title;
    post.short_description = req.body.excerpt
    post.full_text = req.body.body;
    post.category = req.body.category;
    if (req.file) {
        post.post_image = req.file.filename;
    }

    if (!errors.isEmpty()) {
        req.flash('danger', errors.array());
        const categories = Category.find({}, (err, categories) => {
            res.render('admin/editpost', {
                layout: 'admin/layout',
                website_name: 'MEAN Blog',
                page_heading: 'Dashboard',
                page_subheading: 'Edit Post',
                categories: categories,
                form: form,
                post: post
            });
        });
    } else {
        Post.update(query, post, function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', "The post was successfully updated");
                req.session.save(() => res.redirect('/dashboard'));
            }
        });
    }
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    Post.findByIdAndRemove(postId, function(err) {
        if (err) {
            console.log('Error: ', err);
        }
        res.sendStatus(200);
    });
}