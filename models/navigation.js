var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var metaSchema = new mongoose.Schema({
    name: String,
    content: {type: Types.Text}
});

var schema = new mongoose.Schema({
    parent: { type: Types.ObjectId, ref: 'navigation'},
    title: { type: String, required: true },
    meta: [metaSchema],
    url: { type: String, trim: true, lowercase: true},
    template: { type: Types.ObjectId, ref: 'template'},
    order: { type: Number, editable: false },
    menu: { type: Boolean, 'default': true },
    show: { type: Boolean, 'default': true }
});

schema.methods.toString = function(){
    return this.title;
};

schema.pre('validate', function(next) {
    var url = this.url;
    if (!url)
        url = '/' + this.title;

    url = url.replace(/[\?\'\"\@\!\#\$\%\^\&\*\(\)\+\=\_\~\{\}\[\]\\\|\,\;\:]/g, "")
        .replace(/ +/g, "-")
        .replace(/\-+/g, '-')
        .replace(/(?:^\-|\-$)/g, '');

    if (url.substr(0,1) !== '/')
        url = '/' + url;

    this.url = url;
    next();
});

schema.path('url').validate(function(v, callback){
    this.db.model('navigation').findOne().where('url', this.url).ne('_id', this._id).exec(function(err, url){
        callback(url ? false: true);
    });
}, 'url already exists');

var model = module.exports = mongoose.model('navigation', schema);

