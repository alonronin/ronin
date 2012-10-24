
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();
app.configure(function(){
    app.set('port', process.env.PORT || 80);
    app.set('views', __dirname + '/views');
    app.set('mongo', process.env.MONGOLAB_URI || 'mongodb://localhost/ronin');


    app.use(express.compress());
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('magical secret ronin'));
    app.use(express.cookieSession({cookie: { maxAge: 60 * 1000 * 20 }}));
    app.use(app.router);

    require('./admin')(app, express);

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function(req, res, next){
        res.status(404);
        res.end('Oops!!!');
    })

});

app.configure('development', function(){
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
});

require('mongoose').connect(app.get('mongo'));

app.get('/api', function(req, res){
    require('./models').navigation.find().exec(function(err, docs){
        res.json(err || docs);
    })
});

app.get('*', function(req, res, next){
    require('./models').navigation.find().where('url', req.params[0].replace(/^\//, '')).where('show', true).exec(function(err, docs){
        if(err || docs.length)
            res.json(err || docs);
        else
            next();
    })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
