const Post = require('../../models/post');
const moment = require('moment');

exports.getPosts = (req, res, next) => {
    const posts = Post.find({}, (err, posts) => {
        if(err){
            console.log('Error: ', err);
        } else {
            res.render('default/index', {
                moment: moment,
                layout: 'default/layout',
                website_name: 'MEAN Blog',
                page_heading: 'XPress News',
                page_subheading: 'A MEAN Stack Blogging Application',
                posts: posts.reverse(),
            });
        }
    }).populate('category');
};

exports.getPostsByCategory = (req, res, next) => {

    function titleize(slug) {
			var words = slug.split("-");
			return words.map(function(word) {
                //return word;
                return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
			}).join(' ');
		}

    const postCategory = titleize(req.params.catname);

    const posts = Post.find({ cat_name: { $eq: postCategory }}, (err, posts) => {
        if(err){
            console.log('Error: ', err);
        } else {
            res.render('default/index', {
                moment: moment,
                layout: 'default/layout',
                website_name: 'MEAN Blog',
                page_heading: 'XPress News',
                page_subheading: 'A MEAN Stack Blogging Application',
                posts: posts.reverse(),
            });
        }
    }).populate('category');
};

exports.getSinglePost = (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Post.findById(id, function(err, post){
            if(err){
                console.log('Error: ', err);
            } else {
                res.render('default/singlepost', {
                    layout: 'default/layout',
                    website_name: 'MEAN Blog',
                    post: post
                });
            }
        });
    }
};