var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var bannersSchema = new Schema({
    title: { type: String },
    description: { type: Schema.Types.Text },
    picture: { type: Schema.Types.Picture },
    url: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, default: true }
});

var banners = module.exports = mongoose.model('banners', bannersSchema);