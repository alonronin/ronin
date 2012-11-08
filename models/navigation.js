var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var metaSchema = new Schema({
    name: String,
    content: {type: Schema.Types.Text}
});

var navigationSchema = new Schema({
    parent: { type: ObjectId, ref: 'navigation'},
    title: { type: String, required: true },
    meta: [metaSchema],
    url: { type: String, trim: true, lowercase: true},
    template: { type: ObjectId, ref: 'template'},
    order: { type: Number, editable: false },
    menu: { type: Boolean, 'default': true },
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

