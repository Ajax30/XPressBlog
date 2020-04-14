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

exports.addCategoryForm = (req, res, next) => {
	res.render('admin/addcategory', {
		layout: 'admin/layout',
		website_name: 'MEAN Blog',
		page_heading: 'Dashboard',
		page_subheading: 'Add New Category',
	});
}

exports.addCategory = (req, res, next) => {

	var form = {
		categoryholder: req.body.cat_name
	};
	
	const errors = validationResult(req);

	const category = new Category();

	category.cat_name = req.body.cat_name;

	if (!errors.isEmpty()) {
		req.flash('danger', errors.array())
		res.render('admin/addcategory',{
			layout: 'admin/layout',
			website_name: 'MEAN Blog',
			page_heading: 'Dashboard',
			page_subheading: 'Add New Category',
			form:form
		}
		);
	} else {
		category.save(function(err) {
			if (err) {
				console.log(err);
				return;
			} else {
				req.flash('success', "The category was successfully added");
				req.session.save(() => res.redirect('/dashboard/categories'));
			}
		});
	}
}

exports.editCategory = (req, res, next) => {
	const catId = req.params.id;

	Category.findById(catId, function(err, category){
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('admin/editcategory', {
				layout: 'admin/layout',
				website_name: 'MEAN Blog',
				page_heading: 'Dashboard',
				page_subheading: 'Edit Category',
				category: category
			});
		}
	});
}

exports.updateCategory = (req, res, next) => {

	const query = {_id:req.params.id}

	var form = {
		categoryholder: req.body.cat_name
	};

	const errors = validationResult(req);
	
	const category = {};
	
	category._id = req.params.id;
	category.cat_name = req.body.cat_name;

	if (!errors.isEmpty()) {
		req.flash('danger', errors.array())
		res.render('admin/editcategory',{
			layout: 'admin/layout',
			website_name: 'MEAN Blog',
			page_heading: 'Dashboard',
			page_subheading: 'Edit Category',
			form: form,
			category: category
		}
		);
	} else {
		Category.update(query, category, function(err){
			if(err){
				console.log(err);
				return;
			} else {
				req.flash('success', "The category was successfully updated");
				req.session.save(() => res.redirect('/dashboard/categories'));
			}
		});
	}
}

exports.deleteCategory = (req, res, next) => {
	const catId = req.params.id;
	Category.findByIdAndRemove(catId, function(err){
		if (err) {
			console.log('Error: ', err);
		}
		res.sendStatus(200);
	});
}
  
