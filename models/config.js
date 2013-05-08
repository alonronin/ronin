var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    key: { type: String, required: true },
    value: { type: Types.Text }
});

var model = module.exports = mongoose.model('config', schema);