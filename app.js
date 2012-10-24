
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    cons = require('consolidate');

var app = module.exports = express();

app.configure(function(){
    app.set('port', process.env.PORT || 80);
    app.set('mongo', process.env.MONGOLAB_URI || 'mongodb://localhost/ronin');

    app.engine('html', require('consolidate').dust);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));

    app.use(express.compress());
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('magical secret ronin'));
    app.use(express.cookieSession({cookie: { maxAge: 60 * 1000 * 20 }}));

    app.use(express.static(path.join(__dirname, 'public')));

    require('./admin')(app);

    app.use(app.router);

    app.use(function(req, res, next){
        res.status(404);
        res.render('404', {title: 'Page Not Found', content: 'we are sorry, but the requested page is not found.'});
    })
});

app.configure('development', function(){
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
});

require('mongoose').connect(app.get('mongo'));
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
