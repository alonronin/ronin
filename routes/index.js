var models = require('../models');

/*
    middle-wares
 */
var page = function(req, res, next){
    var id = req.query.id;
    var params = req.params[0];
    var query = models.navigation.findOne();

    if(id)
        query
            .or([{'_id': id}]);
    else
        query
            .or([{'url': params}]);

    query
        .where('show', true)
        .populate('template')
        .exec(function(err, page){
            if(page) req.page = page;
            next(err);
        })
};

var navigation = function(req, res, next){
    models
        .navigation
        .find()
        .where('show', true)
        .sort({order: 1})
        .exec(function(err, navigation){
            req.navigation = navigation;
            next(err);
        })
};

var content = function(req, res, next){
    if( req.page && req.page.id ) {

    models
        .content
        .find()
        .where('show', true)
        .where('navigation', req.page.id)
        .sort({order: 1})
        .exec(function(err, content){
            req.content = content;
            next(err);
        })

    } else
        next()
};

module.exports = function(app){
    // rewrite rules
    models
        .redirect
        .find()
        .exec(function(err, rewrite){
            if(!err) {
                rewrite.forEach(function(rule){
                    app.get(encodeURI(rule.route), function(req, res){
                        res.redirect(rule.status, rule.redirect);
                    })
                });
            }
        });

    //cms rules
    app.get('*', [navigation, page, content], function(req, res, next){
        if(req.page){
            var o = {};
            o.page = req.page;
            o.navigation = req.navigation || [];
            o.content = req.content || [];

            res.render(req.page.template.title, o);
        }
        else
            next();

    });

};