const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_name: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Category', categorySchema);