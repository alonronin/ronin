var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var picsSchema = new Schema({
    picture: {type: Schema.Types.Picture}
});

var pics = module.exports = mongoose.model('pics', picsSchema);