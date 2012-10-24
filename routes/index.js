module.exports = function(app){

    app.get('/api', function(req, res){
        require('../models').navigation.find().exec(function(err, docs){
            res.json(err || docs);
        })
    });

    app.get('*', function(req, res, next){
        require('../models')
            .navigation
            .findOne()
            .where('url', req.params[0].replace(/^\//, '') || null)
            .where('show', true)
            .populate('template')
            .exec(function(err, doc){
                if(doc)
                    res.render(doc.template.title, doc);
                else
                    next(err);
            })
    });
};