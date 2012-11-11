var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var socialTabsSchema = new Schema({
    icon: { type: String, enum: ['twitter', 'facebook', 'vimeo', 'youtube', 'skype'], required: true },
    url: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var social = module.exports = mongoose.model('social', socialTabsSchema);