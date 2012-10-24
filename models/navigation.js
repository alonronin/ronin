var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var navigationSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String },
    template: { type: ObjectId, ref: 'template'},
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

navigationSchema.methods.toString = function(){
    return this.title;
};

navigationSchema.path('url').validate(function(v, callback){
    this.db.model('navigation').findOne().where('url', this.url).ne('_id', this._id).exec(function(err, url){
        callback(url ? false: true);
    });
}, 'url already exists');

var navigation = module.exports = mongoose.model('navigation', navigationSchema);

