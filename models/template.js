var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var templateSchema = new Schema({
    title: { type: String, required: true }
});

templateSchema.methods.toString = function(){
    return this.title;
};

var navigation = module.exports = mongoose.model('template', templateSchema);

