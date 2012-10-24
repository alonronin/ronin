var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var configSchema = new Schema({
    key: { type: String, required: true },
    value: { type: Schema.Types.Text }
});

var config = module.exports = mongoose.model('config', configSchema);