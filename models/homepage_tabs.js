var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var homepageTabsSchema = new Schema({
    title: { type: String, required: true },
    sub_title: { type: String },
    icon: { type: String, enum: ['copywriting', 'product-design', 'interface-design', 'user-research', 'usability-testing', 'prototyping'] },
    text: { type: Schema.Types.Html },
    button: { text: String, url: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var homepage_tabs = module.exports = mongoose.model('homepage_tabs', homepageTabsSchema);