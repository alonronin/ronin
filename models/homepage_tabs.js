var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    sub_title: { type: String },
    icon: { type: String, enum: ['copywriting', 'product-design', 'interface-design', 'user-research', 'usability-testing', 'prototyping'] },
    text: { type: Types.Html },
    button: { text: String, url: String, show: { type: Boolean, default: true} },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var model = module.exports = mongoose.model('homepage_tabs', schema);