var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var schema = new mongoose.Schema({
    title: { type: String, required: true }
});

schema.methods.toString = function(){
    return this.title;
};

var model = module.exports = mongoose.model('template', schema);

