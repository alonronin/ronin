var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var highlightsSchema = new Schema({
    title: { type: String, required: true },
    text: { type: Schema.Types.Html },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var highlights = module.exports = mongoose.model('highlights', highlightsSchema);