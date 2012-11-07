var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var mainTitleSchema = new Schema({
    title: { type: String, required: true },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var main_title = module.exports = mongoose.model('main_title', mainTitleSchema);
