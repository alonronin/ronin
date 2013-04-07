var models = require('../models'),
    dust = require('dustjs-linkedin');

/*
 middle-wares
 */
var config = function(req, res, next){
    models
        .config
        .find()
        .exec(function(err, config){
            var o = {};
            config.forEach(function(con){
                o[con.key] = con.value;
            });

            req.config = o;
            next(err);
        })
};

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
            if(page) req.page = page.toObject();
            next(err);
        })
};

var crumbs = function(req, res, next){
    var crumbs = [];

    var parent = function(id){
        models
            .navigation
            .findOne()
            .where('_id', id)
            .exec(function(err, page){
                if(page) {
                    crumbs.push(page.toObject());
                    parent(page.parent);
                }else{
                    req.crumbs = crumbs.reverse();
                    next()
                }

            })
    };

    if(req.page){
        req.page.last = true;
        crumbs.push(req.page);
        parent(req.page.parent);
    }
    else next();
};

module.exports = function(app){
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

            app.get('/contacts', function(req, res){
                models
                    .contact
                    .find()
                    .exec(function(err, contacts){
                        res.send(err || contacts)
                    })
            });

            //cms rules
            app.get('*', [config, page, crumbs], function(req, res, next){
                if(req.page){
                    var o = {};
                    o.page = req.page;
                    o.page.query = req.query;

                    o.config = req.config || {};
                    o.crumbs = req.crumbs || {};

                    res.locals.development = app.get('env') == "development";
                    res.render(req.page.template.title, o);
                }
                else
                    next();

            });

            var mail = require('../mail');
            mail.init(app.get('sendgrid'));

            app.post('/thank-you', [config], function(req, res){

                var o = req.body,
                    send = false;

                Object.each(o, function(key, value){
                    o[key] = value.stripTags().trim();
                    console.log(o[key].length);
                    if(o[key].length) send = true;
                });

                if(send){
                    o.req = {headers: req.headers, session: req.session, ip: req.ip};
                    o.date = new Date();

                    var message = {};
                    message.to = req.config.email;
                    message.from = o.email || req.config.email;
                    message.subject = req.config.email_subject;

                    dust.loadSource(dust.compile(req.config.email_template, "email_template"));
                    dust.render('email_template', o, function(err, text){
                        message.html = text;
                    });

                    //console.log('Sending mail', message);
                    var contact = new models.contact(o);
                    contact.save();

                    mail.send(message, function(err, message) {
                        var success = !err;
                        res.json({success: success, message: req.config[(success ? 'contact_success' : 'contact_fail')]});
                    });

                }else{
                    res.json({success: true, message: req.config.contact_success});
                }
            });
        });
};