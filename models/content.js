var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var contentSchema = new Schema({
    navigation: { type: ObjectId, ref: 'navigation' },
    title: { type: String, required: true },
    picture: { type: Schema.Types.Picture },
    description: { type: String },
    text: { type: Schema.Types.Html },
    url: { type: ObjectId, ref: 'navigation' },
    link: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var content = module.exports = mongoose.model('content', contentSchema);