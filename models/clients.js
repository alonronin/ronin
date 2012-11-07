var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var clientsSchema = new Schema({
    title: { type: String },
    picture: { type: Schema.Types.Picture },
    order: { type: Number, editable: false },
    show: { type: Boolean, default: true }
});

var clients = module.exports = mongoose.model('clients', clientsSchema);
