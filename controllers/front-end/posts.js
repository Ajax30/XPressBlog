const Post = require('../../models/post');

exports.getPosts = (req, res, next) => {
    const posts = Post.find({}, (err, posts) => {
        if(err){
            console.log('Error: ', err);
        } else {
            res.render('default/index', {
                layout: 'default/layout',
                website_name: 'MEAN Blog',
                page_heading: 'XPress News',
                page_subheading: 'A MEAN Stack Blogging Application',
                posts: posts.reverse(),
            });
        }
    });
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