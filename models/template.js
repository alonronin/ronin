var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var templateSchema = new Schema({
    title: { type: String, required: true }
});

var navigation = module.exports = mongoose.model('template', templateSchema);