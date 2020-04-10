const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
			cb(null, './uploads/images')
	},
	filename: function (req, file, cb) {
			cb(null, file.fieldname + '-' + Date.now() + '.png')
	}
});

exports.upload = multer({ storage: storage }).single('postimage');

