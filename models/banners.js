var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    title: { type: String },
    description: { type: Types.Text },
    picture: { type: Types.Picture },
    url: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, default: true }
});

var model = module.exports = mongoose.model('banners', schema);