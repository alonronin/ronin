var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var linksSchema = new mongoose.Schema({
    title: {type: String},
    url: String
});

var schema = new mongoose.Schema({
    header: { type: String },
    links: [linksSchema],
    order: { type: Number, editable: false },
    show: { type: Boolean, default: true }
});

var model = module.exports = mongoose.model('footer', schema);