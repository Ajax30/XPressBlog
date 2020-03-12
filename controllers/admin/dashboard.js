const Post = require('../../models/post');
const { check, validationResult } = require('express-validator');

exports.displayDashboard = (req, res, next) => {
    const posts = Post.find({}, (err, posts) => {
        if(err){
            console.log('Error: ', err);
        } else {
            res.render('admin/index', {
              layout: 'admin/layout',
              website_name: 'MEAN Blog',
              page_heading: 'Dashboard',
              posts: posts
            });
        }
    });
};

exports.addPostForm = (req, res, next) => {
    res.render('admin/addpost', {
        layout: 'admin/layout',
        website_name: 'MEAN Blog',
        page_heading: 'Dashboard',
        page_subheading: 'Add New Post',
      });
}

exports.addPost = (req, res, next) => {
		// Form validation rules
		check('title', 'The title field id required')
		.not()
		.isEmpty();
	check('excerpt', 'The excerpt field id required')
		.not()
		.isEmpty();
 check('body', 'The full text field id required')
		.not()
		.isEmpty();

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render('admin/addpost', {
        layout: 'admin/layout',
        website_name: 'MEAN Blog',
        page_heading: 'Dashboard',
				page_subheading: 'Add New Post',
				errors: errors
			});
			req.flash('danger', errors);
			req.session.save(() => res.redirect('/dashboard'));
		} else {
				const post = new Post();
					post.title = req.body.title;
					post.short_description = req.body.excerpt
					post.full_text = req.body.body;

				post.save(function(err){
						if(err){
								console.log(err);
								return;
						} else {
							req.flash('success', "The post was successfully added");
							req.session.save(() => res.redirect('/dashboard'));
						}
				});
		}
}

exports.editPost = (req, res, next) => {
	const postId = req.params.id;
	Post.findById(postId, function(err, post){
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('admin/editpost', {
        layout: 'admin/layout',
        website_name: 'MEAN Blog',
        page_heading: 'Dashboard',
				page_subheading: 'Edit Post',
				post: post
			});
		}
	});
}

exports.updatePost = (req, res, next) => {
	const query = {_id:req.params.id}
	
	const post = {};
		post.title = req.body.title;
		post.short_description = req.body.excerpt
		post.full_text = req.body.body;

	Post.update(query, post, function(err){
			if(err){
					console.log(err);
					return;
			} else {
				req.flash('success', "The post was successfully updated");
				req.session.save(() => res.redirect('/dashboard'));
			}
	});
}

exports.deletePost = (req, res, next) => {
	const postId = req.params.id;
	Post.findByIdAndRemove(postId, function(err){
		if (err) {
			console.log('Error: ', err);
		}
		res.sendStatus(200);
	});
}
  