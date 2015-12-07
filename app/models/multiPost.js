
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    name: String,
    email: String,
    title: String
});

module.exports = mongoose.model('multiPost',postSchema);