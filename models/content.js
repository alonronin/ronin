var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var contentSchema = new Schema({
    navigation: { type: ObjectId, ref: 'navigation' },
    title: { type: String, required: true },
    picture: { type: Schema.Types.File },
    text: { type: Schema.Types.Html },
    url: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var content = module.exports = mongoose.model('content', contentSchema);