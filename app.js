/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    logger = require('./logger'),
    admin = require('./admin'),
    mongoose = require('mongoose');

admin.mongoose_module = mongoose;

// add some sugar baby
require('sugar');

var app = module.exports = express();

app.configure(function(){
    app.set('cloudinary', process.env.CLOUDINARY_URL);
    app.set('port', process.env.PORT);
    app.set('mongo', process.env.MONGOLAB_URI);
    app.set('sendgrid', { user: process.env.SENDGRID_USERNAME, key: process.env.SENDGRID_PASSWORD });
    app.set('admin', {username: 'admin', password: process.env.ADMIN_PASSWORD});
    app.set('site', 'RONIN');

    app.engine('html', require('consolidate').dust);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));

    app.use(logger.domain_wrapper_middleware);

    app.use(express.compress());
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('magical secret ronin'));
    app.use(express.cookieSession({cookie: { maxAge: (20).minutes() }}));

    app.use(express.static(path.join(__dirname, 'public')));

    admin(app, express, mongoose);

    app.use(app.router);

    app.use(function(req, res, next){
        res.status(404);
        res.render('404', {title: 'The page cannot be found', content: '<p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p><hr><p>Please try the following:</p><ul><li>Make sure that the Web site address displayed in the address bar of your browser is spelled and formatted correctly.</li><li>If you reached this page by clicking a link, contact the Web site administrator to alert them that the link is incorrectly formatted.</li><li>Click the <a href="javascript:history.back(1)">Back</a> button to try another link.</li></ul><h2>HTTP Error 404 - File or directory not found.</h2><hr>'});
    })
});

app.configure('development', function(){
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
});

mongoose.connect(app.get('mongo'));

require('./dust/helpers');
require('./dust/filters');
require('./mongoose/helpers');
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
