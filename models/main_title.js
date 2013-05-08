var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var model = module.exports = mongoose.model('main_title', schema);
