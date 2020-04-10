const { check } = require('express-validator');

exports.addPostCheck = [
    check('title', 'The title field id required')
    .not()
    .isEmpty(),
    check('excerpt', 'The excerpt field id required')
    .not()
    .isEmpty(),
    check('body', 'The full text field id required')
    .not()
    .isEmpty()
];