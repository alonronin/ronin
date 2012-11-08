var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var contactSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: Schema.Types.Text },
    req: { type: Object },
    date: { type: Date  }
});

var contact = module.exports = mongoose.model('contact', contactSchema);
