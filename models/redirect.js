var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    route: { type: String, required: true },
    redirect: { type: String, required: true },
    status: { type: Number, enum: [301, 302], default: 301 }
});

var schema = module.exports = mongoose.model('redirect', schema);