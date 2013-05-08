var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    title: { type: String },
    picture: { type: Types.Picture },
    order: { type: Number, editable: false },
    show: { type: Boolean, default: true }
});

var model = module.exports = mongoose.model('clients', schema);
