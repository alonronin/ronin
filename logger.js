'use strict';
if (!module.parent) { console.log('Please don\'t call me directly. I am just the main app\'s minion.'); process.exit(1); }

//var CONF = require('config');
var express = require('express');
var util = require('util');
var domain = require('domain');

// Note: if you need to access smth in parent:
// var something = module.parent.exports.something

/** @namespace mem_usage.rss */
/** @namespace mem_usage.heapUsed */
express['logger'].token('memory', function () {
    var mem_usage = process.memoryUsage();
    return util.format('%dMb %dMb', (mem_usage.rss / 1048576).toFixed(0), (mem_usage.heapUsed / 1048576).toFixed(0));
});
express['logger'].token('body', function (req) { return JSON.stringify(req.body || {}).slice(0, 200); });
express['logger'].format('log2', ':memory - :response-time ms - :res[content-length] :status ":method :url :body HTTP/:http-version"');


var catch_all_middleware = function (err, req, res, next) {
    // I have to do something with "next", otherwise I don't get "err"
    next = null;
    console.error(err.stack);
    res.send(500, '<pre>An unexpected error occurred! Please check logs.\n' + err.stack);
};


var domain_wrapper_middleware = function (req, res, next) {
    var d = domain.create();
    d.add(req);
    d.add(res);

    d.on('error', function (err) {
        var message = err.stack || err;
        util.error('#### domain exception ####\n', message, '\n#### end ####');
        try {
            res.json(500, {
                Status: -1,
                Message: message
            });
        } catch (e) {
            util.error('#### no sure if sent 500 ####')
        }
    });

    next();
    d.enter();
};


var register_process_catcher = function () {
    process.on('uncaughtException', function (err) {
        util.error('---- process exception ----\n', err.stack || err, '\n---- end ----');
    });
};


module.exports = {
    catch_all_middleware: catch_all_middleware,
    domain_wrapper_middleware: domain_wrapper_middleware,
    register_process_catcher: register_process_catcher,
    logger_middleware: express.logger('log2')
};
