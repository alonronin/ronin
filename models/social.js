var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    icon: { type: String, enum: ['twitter', 'facebook', 'vimeo', 'youtube', 'skype'], required: true },
    url: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var model = module.exports = mongoose.model('social', schema);