var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var sideSchema = new Schema({
    title: String,
    description: {type: Schema.Types.Text }
});

var contentSchema = new Schema({
    navigation: { type: ObjectId, ref: 'navigation' },
    title: { type: String, required: true },
    picture: { type: Schema.Types.Picture },
    text: { type: Schema.Types.Html },
    url: { type: ObjectId, ref: 'navigation' },
    side_widget: [sideSchema],
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var content = module.exports = mongoose.model('content', contentSchema);