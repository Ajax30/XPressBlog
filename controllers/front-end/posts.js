const Post = require('../../models/post');
const Category = require('../../models/categories');
const moment = require('moment');

exports.getPosts = async (req, res, next) => {

		const posts = await Post.find({}, (err, posts) => {

			const perPage = 5;

			const currPage = req.query.page ? parseInt(req.query.page) : 1;

			const postsCount = posts.length;

			const pageCount = Math.ceil(postsCount/perPage);		

			const pageDecrement = currPage > 1 ? 1 : 0;
	
			const pageIncrement = currPage < pageCount ? 1 : 0;

        if (err) {
            console.log('Error: ', err);
        } else {
            res.render('default/index', {
                moment: moment,
                layout: 'default/layout',
                website_name: 'MEAN Blog',
                page_heading: 'XPress News',
								page_subheading: 'A MEAN Stack Blogging Application',
								currPage: currPage,
								pageDecrement: pageDecrement,
								pageIncrement: pageIncrement,
								posts: posts
            });
        }
    })
				.sort({created_at: -1})
				.populate('category')
				.limit(perPage)
				.skip(currPage - 1) * perPage;
};

exports.getPostsByCategory = async (req, res, next) => {

    function titleize(slug) {
        var words = slug.split("-");
        return words.map(function(word) {
            return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        }).join(' ');
    }

    const postCategory = new RegExp(titleize(req.params.catname),"ig");

    const singleCategory = await Category.findOne({cat_name:postCategory})

    const posts = await Post.find({ category : singleCategory }, (err, posts) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render('default/index', {
                moment: moment,
                layout: 'default/layout',
                website_name: 'MEAN Blog',
                page_heading: singleCategory.cat_name,
                page_subheading: '',
                posts: posts,
            });
        }
		})
		.sort({created_at: -1})
		.populate('category');
};

exports.getSinglePost = (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Post.findById(id, function(err, post) {
            if (err) {
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