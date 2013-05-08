var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    navigation: { type: Types.ObjectId, ref: 'navigation' },
    title: { type: String, required: true },
    picture: { type: Types.Picture },
    description: { type: String },
    text: { type: Types.Html },
    url: { type: Types.ObjectId, ref: 'navigation' },
    link: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var model = module.exports = mongoose.model('content', schema);