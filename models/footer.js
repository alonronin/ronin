var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var linksSchema = new Schema({
    title: {type: String},
    url: String
});

var footerSchema = new Schema({
    header: { type: String },
    links: [linksSchema],
    order: { type: Number, editable: false },
    show: { type: Boolean, default: true }
});

var footer = module.exports = mongoose.model('footer', footerSchema);