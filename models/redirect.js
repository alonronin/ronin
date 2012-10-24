var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var redirectSchema = new Schema({
    route: { type: String, required: true },
    redirect: { type: String, required: true },
    status: { type: Number, enum: [301, 302], default: 301 }
});

var redirect = module.exports = mongoose.model('redirect', redirectSchema);