var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: Types.Text },
    req: Object,
    date: Date
});

var model = module.exports = mongoose.model('contact', schema);
