const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: String,
        color: String
    }
);

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;