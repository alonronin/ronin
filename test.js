var mongoose = require('mongoose'),
    models = require('./models');

require('sugar');

mongoose.connect('mongodb://localhost/ronin');

mongoose.Model.paginate = function(query, page, records, callback){
    page || (page = 1);
    page = page.toNumber().abs();
    //query = query._conditions;

    var self = this,
        from = (page * records) - records;

    query.skip(from).limit(records).exec(function(err, results){
        if(err) return callback(err);

        query.count(function(err, count){
            callback(err, results, count, (count / records).floor());
        });

    });

    /*self.count(query, function(err, count){
        self.find(query).skip(from).limit(records).exec(function(err, results){
            callback(err, results, count, (count / records).floor());
        })
    })*/
};

var query = models.config.find();

models.config.paginate(query, 1, 3, function(err, results, count, pages){
    console.log([err, results, count, pages]);
});

