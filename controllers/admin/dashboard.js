const Post = require('../../models/post');

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
  