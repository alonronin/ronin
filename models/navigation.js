var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var navigationSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

var navigation = module.exports = mongoose.model('navigation', navigationSchema);

navigationSchema.path('url').validate(function(v, callback){
    this.db.model('navigation').findOne().where('url', this.url).ne('_id', this._id).exec(function(err, url){
        callback(url ? false: true);
    });
}, 'url already exists');


/*
navigationSchema.pre('save', function (next) {
    var self = this;

    self.validate(function (err) {

        console.log(this);
        next();
    });


    */
/*navigation.findOne().where('url', self.url).exec(function(err, url){
        if(url) {
            self.invalidate('url', 'url already exists')
        }

        next(err);
    });*//*

});*/
