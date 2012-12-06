var mongoose = require('mongoose');

mongoose.Model.paginate = function(query, page, records, callback){
    page || (page = 1);
    page = page.toNumber().abs();

    var from = (page * records) - records;

    query.skip(from).limit(records).exec(function(err, results){
        if(err) return callback(err);

        query.count(function(err, count){
            callback(err, results, count, (count / (records || count)).ceil());
        });

    });
};