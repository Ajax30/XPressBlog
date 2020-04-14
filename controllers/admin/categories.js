const Category = require('../../models/categories');
const { validationResult } = require('express-validator');

exports.showCategories = (req, res, next) => {
    const categories = Category.find({}, (err, categories) => {
        if(err){
            console.log('Error: ', err);
        } else {
            res.render('admin/categories', {
              layout: 'admin/layout',
              website_name: 'MEAN Blog',
              page_heading: 'Post Categories',
              categories: categories
            });
        }
    });
};
