const mongoose = require('mongoose');
const schema = mongoose.Schema;

//defining schema
const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timesstamps: true});

//create model
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;